import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { MessageModule } from './modules/message/message.module';
import { VoteModule } from './modules/vote/vote.module';

@Module({
  imports: [UserModule, ChatModule, MessageModule, VoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
