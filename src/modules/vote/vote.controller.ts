import { Body, Controller, Post } from '@nestjs/common';
import { VoteService } from './vote.service';
import { ApiResponse } from '../../commom/interfaces/api-response.interface';
import { SUCCESS_MSG } from '../../commom/constant/result-msg.constant';
import { LoginUser } from '../../components/auth/login-user';
import { User } from '../../components/auth/login-user.decorator';
import { Auth } from '../../components/auth/auth.decorator';
import { Log } from '../../components/log/log.decoorator';
import { VoteDto } from './dto/vote.dto';
import { Validated } from '../../components/validate/validated.decorator';

/**
 * 点赞、评论 服务
 *
 * @author dawei
 */
@Controller('vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  /**
   * 保存点赞、评论
   */
  @Log()
  @Auth()
  @Validated()
  @Post('saveVote')
  async saveVote(
    @Body() dto: VoteDto,
    @User() user: LoginUser,
  ): Promise<ApiResponse<string>> {
    const voteId: string = await this.voteService.saveVote(
      dto,
      user.id.toString(),
    );
    return ApiResponse.success(SUCCESS_MSG, voteId);
  }
}
