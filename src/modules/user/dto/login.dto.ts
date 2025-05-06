import { IsNotEmpty, Length } from 'class-validator';

/**
 * 登录参数
 */
export class LoginDto {
  @IsNotEmpty({ message: 'username不能为空' })
  username: string;

  @IsNotEmpty({ message: 'password不能为空' })
  @Length(6, 20, { message: '密码长度必须在 6 到 20 之间' })
  password: string;
}
