import { Controller } from '@nestjs/common';
import { MessageService } from './message.service';

/**
 * 对话消息 服务
 *
 * @author dawei
 */
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
}
