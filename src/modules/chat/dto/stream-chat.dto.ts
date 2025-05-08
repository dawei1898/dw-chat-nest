import { IsNotEmpty } from 'class-validator';

/**
 * 流式聊天入参
 *
 * @author dawei
 */
export class StreamChatDto {
  @IsNotEmpty({ message: 'chatId不能为空' })
  chatId: string;

  @IsNotEmpty({ message: 'content不能为空' })
  content: string;

  /** 模型 ID */
  modelId?: string = '';

  /** 开启推理 */
  openReasoning?: boolean;

  /** 开启网络搜索 */
  openSearch?: boolean;
}
