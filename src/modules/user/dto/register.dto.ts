import { IsNotEmpty, Length } from 'class-validator';

/**
 * 注册参数
 */
export class RegisterDto {
  id?: bigint;

  @IsNotEmpty({ message: 'username不能为空' })
  username: string;

  @IsNotEmpty({ message: 'password不能为空' })
  @Length(6, 20, { message: '密码长度必须在 6 到 20 之间' })
  password: string;

  /** 邮箱 */
  email?: string;
}
