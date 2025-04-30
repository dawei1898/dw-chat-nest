import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class VoteService {
  private readonly logger = new Logger(VoteService.name);
}
