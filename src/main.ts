import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

/**
 * 项目启动入口
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap'); // 创建 Logger 实例
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Dw Chat Nest Application is running on: ${await app.getUrl()}`);
}

bootstrap();
