import { PageParam } from '../../../commom/interfaces/page-aram';

/**
 * 聊天会话入参
 */
export class ChatDto extends PageParam {
  /** 会话 ID */
  chatId?: string;

  /** 会话名称 */
  chatName: string;
}
