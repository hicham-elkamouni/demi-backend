import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CommentController } from './comment.controller';
import { CommentSchema } from './comment.schema';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    AuthModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
