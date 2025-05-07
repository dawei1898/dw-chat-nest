import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { BizExceptionFilter } from './commom/filters/biz-exception.filter';
import { AuthExceptionFilter } from './commom/filters/auth-exception.filter';
import {
  BadRequestExceptionFilter,
  ValidateExceptionFilter,
} from './commom/filters/validate-exception.filter';
import { TransformInterceptor } from './commom/interceptors/transform.interceptor';

/**
 * 项目启动入口
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap'); // 创建 Logger 实例
  const app = await NestFactory.create(AppModule);
  // 异常处理器
  app.useGlobalFilters(
    new BizExceptionFilter(),
    new AuthExceptionFilter(),
    new ValidateExceptionFilter(),
    new BadRequestExceptionFilter(),
  );
  // 拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  /*// 参数校验
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动转换参数，比如 string 转为 number
      whitelist: true, // 只保留 DTO 定义的字段，防止传多余字段
    }),
  );*/
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Dw Chat Nest Application is running on: ${await app.getUrl()}`);
}

bootstrap();
