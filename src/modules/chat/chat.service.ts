import { Injectable, Logger } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { ValidateUtil } from '../../commom/utils/validate.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';
import IdUtil from '../../commom/utils/id.util';
import { PageResult } from '../../commom/interfaces/page-result';
import { MessageService } from '../message/message.service';

/**
 * 会话记录服务
 *
 * @author dawei
 */
@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly messageService: MessageService,
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {}

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
}
