import { IsNotEmpty, IsString } from 'class-validator';

export class VoteDto {
  @IsNotEmpty({ message: 'contentI不能为空！' })
  contentId: string;

  @IsString()
  voteType: string;
}
