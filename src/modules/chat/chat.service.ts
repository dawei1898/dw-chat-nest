import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
}
