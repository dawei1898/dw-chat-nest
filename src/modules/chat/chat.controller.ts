import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Auth } from '../../components/auth/auth.decorator';
import { Log } from '../../components/log/log.decoorator';
import { ApiResponse } from '../../commom/interfaces/api-response.interface';
import { ChatDto } from './dto/chat.dto';
import { SUCCESS_MSG } from '../../commom/constant/result-msg.constant';
import { User } from '../../components/auth/login-user.decorator';
import { LoginUser } from '../../components/auth/login-user';
import { PageResult } from '../../commom/interfaces/page-result';
import { ChatEntity } from './chat.entity';
import { MessageVo } from '../message/vo/message.vo';
import { StreamChatDto } from './dto/stream-chat.dto';
import { Observable } from 'rxjs';
import { Validated } from '../../components/validate/validated.decorator';

/**
 * 会话记录服务
 *
 * @author dawei
 */
@Controller('chat')
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  /**
   * 保存聊天会话
   */
  @Log()
  @Auth()
  @Post('saveChat')
  async saveChat(
    @Body() dto: ChatDto,
    @User() user: LoginUser,
  ): Promise<ApiResponse<string>> {
    const chatId: string = await this.chatService.saveChat(
      dto,
      user.id.toString(),
    );
    return ApiResponse.success(SUCCESS_MSG, chatId);
  }

  /**
   * 删除聊天会话
   */
  @Log()
  @Auth()
  @Delete('/deleteChat/:chatId')
  async deleteChat(
    @Param('chatId') chatId: string,
    @User() user: LoginUser,
  ): Promise<ApiResponse<number>> {
    const count: number = await this.chatService.deleteChat(
      chatId,
      user.id.toString(),
    );
    return ApiResponse.success(count);
  }

  /**
   * 分页查询聊天会话
   */
  @Log()
  @Auth()
  @Post('queryChatPage')
  async queryChatPage(
    @Body() dto: ChatDto,
    @User() user: LoginUser,
  ): Promise<ApiResponse<PageResult<ChatEntity>>> {
    const page: PageResult<ChatEntity> = await this.chatService.queryChatPage(
      dto,
      user.id.toString(),
    );
    return ApiResponse.success(page);
  }

  /**
   * 查询聊天消息列表
   */
  @Log()
  @Auth()
  @Get('/queryMessageList/:chatId')
  async queryMessageList(
    @Param('chatId') chatId: string,
    @User() user: LoginUser,
  ): Promise<ApiResponse<MessageVo[]>> {
    const messageVos: MessageVo[] = await this.chatService.queryMessageList(
      chatId,
      user.id.toString(),
    );
    return ApiResponse.success(messageVos);
  }

  /**
   * 流式对话
   */
  @Log()
  @Auth()
  @Validated()
  @Sse('streamChat')
  streamChat(
    @Body() dto: StreamChatDto,
    @User() user: LoginUser,
  ): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.chatService
        .streamChat(user.id.toString(), dto, (text: string) => {
          subscriber.next(text);
        })
        .then(() => {
          subscriber.complete();
        })
        .catch((error) => {
          this.logger.error('流式响应错误:', error); // 使用 Nest 的日志系统
          subscriber.error(error);
        });
    });
  }
}
