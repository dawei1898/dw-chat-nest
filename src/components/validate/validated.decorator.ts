import {
  applyDecorators,
  UsePipes,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

/**
 * 方法级的参数验证 装饰器
 * @param options 可选的 ValidationPipe 配置
 */
export function Validated(options?: ValidationPipeOptions) {
  return applyDecorators(
    UsePipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        ...options,
      }),
    ),
  );
}
