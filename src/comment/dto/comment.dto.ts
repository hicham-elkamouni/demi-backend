import { IsString, IsNotEmpty } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  commentedBy: string;

  @IsString()
  @IsNotEmpty()
  post: string;
}
