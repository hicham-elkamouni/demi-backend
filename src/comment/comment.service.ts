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
    // get all comments
    return this.commentModel.find();
  }

  findOne(id: string) {
    // get one comment
    return this.commentModel.findById(id);
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    // update one comment
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto);
  }

  async findByUser(userId: string) {
    // get all comments by user
    return this.commentModel.find({ userId });
  }

  async remove(id: string) {
    // check comment if exists before deleting
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
}
