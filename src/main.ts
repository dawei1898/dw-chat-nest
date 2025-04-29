import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * 项目启动入口
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Dw Chat Nest Application is running on: ${await app.getUrl()}`);
}

bootstrap();
