import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'dwc_user' })
export class UserEntity {
  @PrimaryColumn({ type: 'bigint', comment: '用户ID' })
  id: bigint;

  @Column({ name: 'name', type: 'string', comment: '用户名' })
  name: string;

  @Column({ name: 'email', type: 'string', comment: '邮件' })
  email: string;

  @Column({ name: 'phone', type: 'integer', comment: '手机号' })
  phone: number;

  @Column({ name: 'password', type: 'string', comment: '密码' })
  password: string;

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
