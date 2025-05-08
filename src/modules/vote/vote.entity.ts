import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * 点赞、评论实体
 *
 * @author dawei
 */
@Entity({ name: 'dwc_vote_record' })
export class VoteEntity {
  @PrimaryColumn({ name: 'vote_id', type: 'varchar', comment: '主键' })
  voteId: string;

  @Column({
    name: 'content_id',
    type: 'varchar',
    comment: '内容ID（消息、评论等）',
  })
  contentId: string;

  @Column({ name: 'user_id', type: 'varchar', comment: '用户 ID' })
  userId: string;

  @Column({ name: 'vote_type', type: 'varchar', comment: 'up-点赞，down-点踩' })
  voteType: string;

  @Column({ name: 'create_time', type: 'datetime', comment: '创建时间' })
  createTime: Date;

  @Column({ name: 'update_time', type: 'datetime', comment: '修改时间' })
  updateTime: Date;
}
