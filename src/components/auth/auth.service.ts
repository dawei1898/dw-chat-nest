import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoginUser } from './login-user';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { BizException } from '../../commom/exceptions/biz.exception';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * 生成 token
   */
  async buildToken(loginUser: LoginUser) {
    if (!loginUser) {
      throw new BizException('loginUser is null');
    }
    // 生成 token
    const token = await this.jwtService.signAsync(loginUser);
    // token 存入缓存
    const jwtExpiresIn = parseInt(
      this.configService.get<string>('JWT_EXPIRES_IN') || '60',
    );
    await this.cacheManager.set(
      'token_' + loginUser.tokenId,
      token,
      jwtExpiresIn * 1000,
    );
    return token;
  }

  /**
   * 解析 token
   */
  async parseToken(token: string) {
    if (token) {
      try {
        const loginUser: LoginUser = await this.jwtService.verifyAsync(token);
        if (loginUser) {
          const hasToken = await this.cacheManager.get(
            'token_' + loginUser.tokenId,
          );
          if (hasToken) {
            return loginUser;
          }
        }
      } catch (e) {
        this.logger.error('Failed to parseToken.', e);
      }
    }
  }

  /**
   * 删除 token
   */
  async removeToken(tokenId: string) {
    if (tokenId) {
      await this.cacheManager.del('token_' + tokenId);
      return true;
    }
    return false;
  }
}
