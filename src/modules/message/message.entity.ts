import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'dwc_chat_message' })
export class MessageEntity {
  @PrimaryColumn({ name: 'msg_id', type: 'bigint', comment: '消息ID' })
  msgId: bigint;

  @Column({ name: 'raw_msg_id', type: 'varchar', comment: '原始消息ID' })
  rawMsgId: string;

  @Column({ name: 'chat_id', type: 'varchar', comment: '聊天会话ID' })
  chatId: string;

  @Column({
    name: 'type',
    type: 'varchar',
    comment: '消息类型（1-用户提问，2-机器回答）',
  })
  type: string;

  @Column({
    name: 'role',
    type: 'varchar',
    comment: '角色（user-用户，assistant-AI助手）',
  })
  role: string;

  @Column({
    name: 'content_type',
    type: 'varchar',
    comment: '消息内容格式（text-文本，image-图像）',
  })
  contentType: string;

  @Column({ name: 'content', type: 'varchar', comment: '消息内容' })
  content: string;

  @Column({ name: 'reasoning_content', type: 'varchar', comment: '思考内容' })
  reasoningContent: string;

  @Column({ name: 'tokens', type: 'int', comment: '消耗token数' })
  tokens: number;

  @Column({ name: 'model_group', type: 'varchar', comment: '模型厂商' })
  modelGroup: string;

  @Column({ name: 'model_id', type: 'varchar', comment: '模型ID' })
  modelId: string;

  @Column({ name: 'create_user', type: 'varchar', comment: '创建人ID' })
  createUser: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: Date;

  @Column({ name: 'deleted', type: 'int', comment: '是否删除（0-否，1-是）' })
  deleted: number;
}
