import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { AuthModule } from '../../components/auth/auth.module';
import { VoteModule } from '../vote/vote.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([MessageEntity]),
    AuthModule,
    VoteModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
