import { Injectable, Logger } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { ValidateUtil } from '../../commom/utils/validate.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';
import IdUtil from '../../commom/utils/id.util';

/**
 * 会话记录服务
 *
 * @author dawei
 */
@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
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
}
