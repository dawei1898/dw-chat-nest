import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'dwc_chat_record' })
export class ChatEntity {
  @PrimaryColumn({ name: 'chat_id', type: 'string', comment: '聊天会话ID' })
  chatId: string;

  @Column({ name: 'chat_name', type: 'string', comment: '会话名称' })
  chatName: string;

  @Column({ name: 'user_id', type: 'bigint', comment: '所属用户ID' })
  userId: bigint;

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

  @Column({ name: 'deleted', type: 'int', comment: '是否删除（0-否，1-是）' })
  deleted: number;
}
