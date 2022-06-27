import { PostController } from './post.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Post, PostSchema } from './post.schema';
import { PostService } from './post.service';
import { CommentModule } from 'src/comment/comment.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    AuthModule,
    CommentModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
