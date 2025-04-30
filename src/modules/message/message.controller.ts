import { Controller } from '@nestjs/common';

@Controller('message')
export class MessageController {
  constructor(private messageController: MessageController) {}
}
