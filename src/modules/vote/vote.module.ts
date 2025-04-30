import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteEntity } from './vote.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([VoteEntity])],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
