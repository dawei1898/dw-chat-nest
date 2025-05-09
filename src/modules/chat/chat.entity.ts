import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TransformDate } from '../../commom/decorators/transform-date.decorator';

/**
 * 会话记录
 *
 * @author dawei
 */
@Entity({ name: 'dwc_chat_record' })
export class ChatEntity {
  @PrimaryColumn({ name: 'chat_id', type: 'varchar', comment: '聊天会话ID' })
  chatId: string;

  @Column({ name: 'chat_name', type: 'varchar', comment: '会话名称' })
  chatName: string;

  @Column({ name: 'user_id', type: 'varchar', comment: '所属用户ID' })
  userId?: string;

  @TransformDate()
  @Column({ name: 'create_time', type: 'datetime', comment: '创建时间' })
  createTime?: Date;

  @TransformDate()
  @Column({ name: 'update_time', type: 'datetime', comment: '修改时间' })
  updateTime?: Date;

  @Column({ name: 'deleted', type: 'int', comment: '是否删除（0-否，1-是）' })
  deleted?: number;
}
