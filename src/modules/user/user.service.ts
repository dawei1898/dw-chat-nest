import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { randomUUID } from 'crypto';
import { AuthService } from '../../components/auth/auth.service';
import { BizException } from '../../commom/exceptions/biz.exception';
import { LoginUser } from '../../components/auth/login-user';
import { RegisterDto } from './dto/register.dto';
import { ValidateUtil } from '../../commom/utils/validate.util';
import IdUtil from '../../commom/utils/id.util';

/**
 * 用户服务
 */
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 用户注册
   *
   * @author dawei
   */
  async register(dto: RegisterDto): Promise<bigint> {
    const username = dto.username;
    const password = dto.password;
    const email = dto.email;

    // 校验用户名、邮箱
    if (username) {
      const existUser = await this.userRepository.findOneBy({ name: username });
      ValidateUtil.isNotNull(existUser, '用户名已存在！');
    }
    if (email) {
      const existEmail = await this.userRepository.findOneBy({ email: email });
      ValidateUtil.isNotNull(existEmail, '邮箱已存在！');
    }

    // 保存用户
    const userEntity: UserEntity = {
      id: IdUtil.nextId(),
      name: username,
      password: password,
      email: email,
      createTime: new Date(),
      updateTime: new Date(),
    };
    await this.userRepository.insert(userEntity);
    //return userEntity.id;
    return 1n;
  }

  /**
   * 用户登录
   */
  async login(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ name: username });
    if (!user) {
      throw new BizException('用户不存在！');
    }
    if (password !== user.password) {
      throw new BizException('密码不正确！');
    }
    // 生成 token
    const loginUser: LoginUser = {
      tokenId: randomUUID(),
      id: user.id,
      name: user.name,
      expiresIn: new Date().getTime(),
    };
    const token = await this.authService.buildToken(loginUser);
    this.logger.log(
      `登录成功，loginUser:${JSON.stringify(loginUser)}，  token：${token}`,
    );
    return token;
  }

  /**
   * 退出登录
   */
  async logout(user: LoginUser) {
    if (user && user.tokenId) {
      await this.authService.removeToken(user.tokenId);
      return true;
    }
    return false;
  }

  /**
   * 查询用户信息
   */
  async queryUser(id: bigint) {
    return await this.userRepository.findOneBy({ id: id });
  }
}
