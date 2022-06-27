import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = new this.commentModel(createCommentDto);
      let NewComment = await comment.save();
      return NewComment;
    } catch (error) {
      return { error: error.message };
    }
  }

  findAll() {
    return this.commentModel.find();
  }

  findOne(id: string) {
    return this.commentModel.findById(id);
  }

  findPostWithComments(id: string) {
    return this.commentModel.find({ post: id });
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto);
  }

  findByUser(userId: string) {
    return this.commentModel.find({ userId });
  }

  async remove(id: string) {
    try {
      const comment = await this.commentModel.findOne({ _id: id });
      if (!comment) {
        return { error: 'Comment not found' };
      }
      return this.commentModel.findByIdAndDelete(id);
    } catch (error) {
      return { error: error.message };
    }
  }

  async findWithPost(id: string) {
    try {
      const comment = await this.commentModel.findById(id);
      if (!comment) {
        return { error: 'Comment not found' };
      }
      const post = await this.commentModel.findById(comment.post);
      return { comment, post };
    } catch (error) {
      return { error: error.message };
    }
  }
}
