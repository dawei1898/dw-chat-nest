import { TransformNull } from '../../../commom/decorators/transform-null.decorator';

/**
 * AI返回消息
 *
 * @author dawei
 */
export class TempMessage {
  /** 是否结束 */
  finished: boolean | null = false;

  /** 错误描述 */
  errorMsg: string = '';

  /** 消息ID */
  msgId: string | null = null;

  /** 原始消息ID */
  @TransformNull()
  rawMsgId: string = '';

  /** 聊天会话ID */
  chatId: string = '';

  /** 消息类型（user-用户提问，ai-机器回答）*/
  type: string = '';

  /** 角色（user-用户，assistant-AI助手） */
  role: string = '';

  /** 模型ID */
  modelId: string = '';

  /** 消息内容 */
  content: string = '';

  /** 思考内容 */
  reasoningContent: string = '';

  tokens?: number;
}
