import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TransformDate } from '../../commom/decorators/transform-date.decorator';
import { TransformBigint } from '../../commom/decorators/transform-bigint.decorator';
import { TransformNull } from '../../commom/decorators/transform-null.decorator';

@Entity({ name: 'dwc_user' })
export class UserEntity {
  @TransformBigint()
  @PrimaryColumn({ type: 'bigint', comment: '用户ID' })
  id: bigint;

  @Column({ name: 'name', type: 'varchar', comment: '用户名' })
  name: string;

  @Column({ name: 'email', type: 'varchar', comment: '邮件' })
  email?: string;

  @Column({ name: 'phone', type: 'int', comment: '手机号' })
  phone?: number;

  @TransformNull()
  @Column({ name: 'password', type: 'varchar', comment: '密码' })
  password: string;

  @TransformDate()
  @Column({ name: 'create_time', type: 'datetime', comment: '创建时间' })
  createTime?: Date;

  @TransformDate()
  @Column({ name: 'update_time', type: 'datetime', comment: '修改时间' })
  updateTime?: Date;
}
