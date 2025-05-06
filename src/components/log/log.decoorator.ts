import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../../commom/interceptors/logging.interceptor';

/**
 * 日志追踪装饰器
 */
export const Log = () => {
  return applyDecorators(UseInterceptors(LoggingInterceptor));
};
