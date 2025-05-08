import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoteEntity } from './vote.entity';
import { VoteDto } from './dto/vote.dto';
import IdUtil from '../../commom/utils/id.util';

/**
 * 点赞、评论 服务
 *
 * @author dawei
 */
@Injectable()
export class VoteService {
  private readonly logger = new Logger(VoteService.name);

  constructor(
    @InjectRepository(VoteEntity)
    private readonly voteRepository: Repository<VoteEntity>,
  ) {}

  /**
   * 保存点赞、评论
   */
  async saveVote(dto: VoteDto, userId: string) {
    const contentId = dto.contentId;
    const voteType = dto.voteType;
    const date = new Date();
    let voteId: string = IdUtil.nextIdString();

    const exist = await this.voteRepository.findOneBy({ contentId, userId });
    if (exist) {
      exist.voteType = voteType;
      exist.updateTime = date;
      await this.voteRepository.save(exist);
      voteId = exist.voteId;
    } else {
      const addVote: VoteEntity = {
        voteId: voteId,
        contentId: contentId,
        voteType: voteType,
        userId: userId,
        createTime: date,
        updateTime: date,
      };
      await this.voteRepository.insert(addVote);
    }
    return voteId;
  }
}
