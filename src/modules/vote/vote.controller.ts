import { Controller } from '@nestjs/common';

@Controller('vote')
export class VoteController {
  constructor(private voteController: VoteController) {}
}
