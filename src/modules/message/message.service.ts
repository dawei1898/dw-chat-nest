import { Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { Repository } from 'typeorm';
import { MessageVo } from './vo/message.vo';
import { VoteService } from '../vote/vote.service';

/**
 * 对话消息 服务
 *
 * @author dawei
 */
@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly voteService: VoteService,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  /**
   * 新增聊天消息
   */
  async addMessage(message: MessageEntity) {
    if (message) {
      await this.messageRepository.insert(message);
    }
  }

  /**
   * 查询聊天消息列表
   */
  async queryMessageList(chatId: string, userId: string): Promise<MessageVo[]> {
    if (!chatId) {
      return [];
    }
    // 根据 chatId 查询 Message
    const messageEntities = await this.messageRepository.find({
      where: { chatId: chatId },
      order: { createTime: 'asc' },
    });
    // MessageEntity 转换为 MessageVo
    const messageVos = messageEntities.map((item) => {
      return plainToClass(MessageVo, item);
    });
    // 聚合 msgIds
    const msgIds = messageVos.map((item) => item.msgId);
    // 查询点赞
    const votes = await this.voteService.queryVoteList(msgIds, userId);
    // 将 votes 与 messages 进行匹配，并更新 voteType
    messageVos.forEach((item) => {
      const vote = votes.find((vote) => vote.contentId === item.msgId);
      item.voteType = vote ? vote.voteType : '';
    });
    return messageVos;
  }

  /**
   * 查询最近聊天消息列表
   */
  async queryLastMessageList(
    chatId: string,
    limit: number,
  ): Promise<MessageVo[]> {
    if (!chatId) {
      return [];
    }
    // 根据 chatId 和 limit 查询 Message
    const messageEntities = await this.messageRepository.find({
      where: { chatId },
      take: limit,
      order: { createTime: 'desc' },
    });
    // MessageEntity 转换为 MessageVo
    return messageEntities.map((item) => {
      return plainToClass(MessageVo, item);
    });
  }
}
