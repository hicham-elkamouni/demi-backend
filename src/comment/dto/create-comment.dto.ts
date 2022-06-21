import { PartialType } from '@nestjs/mapped-types';
import { CommentDto } from './comment.dto';

export class CreateCommentDto extends PartialType(CommentDto) {}
