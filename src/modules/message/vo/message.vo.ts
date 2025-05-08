import { TransformDate } from '../../../commom/decorators/transform-date.decorator';

/**
 * 对话消息返参
 *
 * @author dawei
 */
export class MessageVo {
  // 消息ID
  msgId: string;

  // 聊天会话ID
  chatId: string;

  // 消息类型（1-用户提问，2-机器回答）
  type: string;

  // 角色（user-用户，assistant-AI助手）
  role: string;

  // 消息内容
  content: string;

  // 思考内容
  reasoningContent?: string;

  // 消耗token数
  tokens?: number;

  // 模型厂商
  modelGroup?: string;

  // 模型ID
  modelId?: string;

  // 创建人ID
  createUser?: string;

  // 创建时间
  @TransformDate()
  createTime: Date;

  // 点赞、点踩
  voteType?: string;
}
