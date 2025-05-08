import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { AuthModule } from '../../components/auth/auth.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ChatEntity]),
    AuthModule,
    MessageModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
