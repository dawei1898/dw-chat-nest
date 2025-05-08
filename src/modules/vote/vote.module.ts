import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteEntity } from './vote.entity';
import { AuthModule } from '../../components/auth/auth.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([VoteEntity]), AuthModule],
  controllers: [VoteController],
  providers: [VoteService],
  exports: [VoteService],
})
export class VoteModule {}
