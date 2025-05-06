import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthException } from '../../commom/exceptions/auth.exception';
import { AuthService } from './auth.service';

/**
 * 鉴权 守卫
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
      this.logger.log('token:', token);
      const loginUser = await this.authService.parseToken(token || '');
      if (loginUser) {
        request['loginUser'] = JSON.stringify(loginUser);
        return true;
      }
    } catch (e) {
      this.logger.error('Failed auth.', e);
    }
    throw new AuthException('鉴权失败');
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
