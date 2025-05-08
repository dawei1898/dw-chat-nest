import { Injectable, Logger } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { ValidateUtil } from '../../commom/utils/validate.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';
import IdUtil from '../../commom/utils/id.util';
import { PageResult } from '../../commom/interfaces/page-result';
import { MessageService } from '../message/message.service';
import { StreamChatDto } from './dto/stream-chat.dto';
import OpenAI from 'openai';
import { TempMessage } from './vo/temp-message';
import { MessageEntity } from '../message/message.entity';
import { plainToClass } from 'class-transformer';

/**
 * 会话记录服务
 *
 * @author dawei
 */
@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private openai: OpenAI;

  constructor(
    private readonly messageService: MessageService,
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: process.env.DEEPSEEK_BASE_URL,
    });
  }

  /**
   * 保存聊天会话
   */
  async saveChat(dto: ChatDto, userId: string): Promise<string> {
    ValidateUtil.isEmpty(dto.chatName, '会话名称不能为空!');
    let chatId = dto.chatId;
    const chatName = dto.chatName;

    // 新增
    if (!chatId) {
      const chat: ChatEntity = {
        chatId: IdUtil.simpleUUID(),
        chatName: chatName,
        userId: userId,
        createTime: new Date(),
        updateTime: new Date(),
      };
      await this.chatRepository.insert(chat);
      chatId = chat.chatId;
    }
    // 修改
    else {
      const existChat = await this.chatRepository.findOneBy({
        chatId,
        deleted: 0,
      });
      if (existChat) {
        existChat.chatName = chatName;
        existChat.userId = userId;
        existChat.updateTime = new Date();
        await this.chatRepository.save(existChat);
      }
    }
    return chatId;
  }

  /**
   * 删除聊天会话
   */
  async deleteChat(chatId: string, userId: string) {
    ValidateUtil.isEmpty(chatId, 'chatId不能为空!');
    // 软删除
    const { affected } = await this.chatRepository.update(chatId, {
      deleted: 1,
      userId: userId,
      updateTime: new Date(),
    });
    return affected || 0;
  }

  /**
   * 分页查询聊天会话
   */
  async queryChatPage(dto: ChatDto, userId: string) {
    ValidateUtil.isNull(dto, '参数不能为空！');
    const pageNum = dto.pageNum || 1;
    const pageSize = dto.pageSize || 10;
    const chatName = dto.chatName;

    const queryBuilder = this.chatRepository.createQueryBuilder('chat');
    queryBuilder.where('chat.deleted = :deleted', { deleted: 0 });
    queryBuilder.andWhere('chat.user_id = :userId', { userId: userId });
    if (chatName) {
      queryBuilder.andWhere('chat.chat_name LIKE :chatName', {
        chatName: `%${chatName}%`,
      });
    }
    queryBuilder
      .orderBy('chat.create_time', 'DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize);

    const [data, total] = await queryBuilder.getManyAndCount();
    if (total === 0) {
      return PageResult.buildEmpty<ChatEntity>();
    }
    return PageResult.build<ChatEntity>(pageNum, pageSize, total, data);
  }

  /**
   * 查询聊天消息列表
   */
  async queryMessageList(chatId: string, user: string) {
    return await this.messageService.queryMessageList(chatId, user);
  }

  /**
   * 流式对话
   */
  async streamChat(
    userId: string,
    dto: StreamChatDto,
    onData: (chunk: string) => void,
  ): Promise<void> {
    // 保存 User message
    const userMessage: MessageEntity = new MessageEntity();
    userMessage.msgId = IdUtil.nextIdString();
    userMessage.rawMsgId = userMessage.msgId;
    userMessage.chatId = dto.chatId;
    userMessage.type = 'user';
    userMessage.role = 'user';
    userMessage.content = dto.content;
    userMessage.contentType = 'text';
    userMessage.createUser = userId;
    userMessage.createTime = new Date();
    await this.messageService.addMessage(userMessage);
    this.logger.log('Save user Message');

    // 调起 AI 对话
    const stream = await this.openai.chat.completions.create({
      model: dto.openReasoning ? 'deepseek-reasoner' : 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: dto.content,
        },
      ],
      stream: true,
    });

    // AI message
    const aiMessage: TempMessage = new TempMessage();
    aiMessage.msgId = IdUtil.nextIdString();
    aiMessage.chatId = dto.chatId;
    aiMessage.type = 'ai';
    aiMessage.role = 'assistant';

    // 临时数据
    let contentBuilder: string = '';
    let reasoningContentBuilder: string = '';

    // 处理 AI 返回流式数据
    for await (const chunk of stream) {
      this.logger.debug('response chunk:', chunk);
      aiMessage.rawMsgId = chunk.id;
      aiMessage.modelId = chunk.model;

      // 思考内容
      const reasoning_content: string = (chunk.choices[0]?.delta as any)
        ?.reasoning_content;
      if (reasoning_content) {
        aiMessage.reasoningContent = reasoning_content;
        reasoningContentBuilder += reasoning_content;
        this.logger.log('response reasoning_content:', reasoning_content);
      }
      // 回答内容
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        aiMessage.content = content;
        contentBuilder += content;
        this.logger.log('response content:', content);
      }
      // 结束
      if ('stop' === chunk.choices[0]?.finish_reason) {
        this.logger.log('Stop chat completions');
        aiMessage.finished = true;
        aiMessage.tokens = chunk.usage?.total_tokens;
      }
      onData(JSON.stringify(aiMessage));
    }

    // 保存 AI message
    const aiMessageEntity = plainToClass(MessageEntity, aiMessage);
    aiMessageEntity.content = contentBuilder;
    aiMessageEntity.reasoningContent = reasoningContentBuilder;
    aiMessageEntity.createTime = new Date();
    aiMessageEntity.createUser = userId;
    aiMessageEntity.contentType = 'text';
    await this.messageService.addMessage(aiMessageEntity);
    this.logger.log('Save AI Message');
  }
}
