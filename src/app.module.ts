import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { MessageModule } from './modules/message/message.module';
import { VoteModule } from './modules/vote/vote.module';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import typeOrmModule from './config/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/database.config';

/**
 * 项目模块导入
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'], // 指定环境配置文件
      load: [appConfig, dbConfig],
    }),
    typeOrmModule, // 数据库连接
    ScheduleModule.forRoot(), // 调度任务
    EventEmitterModule.forRoot(), // 事件
    CacheModule.register({ isGlobal: true }), // 缓存
    UserModule,
    ChatModule,
    MessageModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
