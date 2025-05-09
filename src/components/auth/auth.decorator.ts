import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

/**
 * 鉴权 装饰器
 */
export function Auth() {
  return applyDecorators(UseGuards(AuthGuard));
}
