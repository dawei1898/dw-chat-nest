import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'dwc_vote_record' })
export class VoteEntity {
  @PrimaryColumn({ name: 'vote_id', type: 'bigint', comment: '主键' })
  voteId: bigint;

  @Column({
    name: 'content_id',
    type: 'string',
    comment: '内容ID（消息、评论等）',
  })
  contentId: string;

  @Column({ name: 'user_id', type: 'bigint', comment: '用户 ID' })
  userId: bigint;

  @Column({ name: 'vote_type', type: 'string', comment: 'up-点赞，down-点踩' })
  voteType: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'datetime',
    comment: '修改时间',
  })
  updateTime: Date;
}
