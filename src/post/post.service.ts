import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.schema';
import { CommentService } from 'src/comment/comment.service';
@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly commentService: CommentService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = new this.postModel(createPostDto);
      let NewPost = await post.save();
      return NewPost;
    } catch (error) {
      return { error: error.message };
    }
  }

  findAll() {
    // get all posts
    return this.postModel.find();
  }

  findOne(id: string) {
    // get one post
    return this.postModel.findById(id);
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    // update one post
    return this.postModel.findByIdAndUpdate(id, updatePostDto);
  }

  //get post with comments
  async findWithComments(id: string) {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        return { error: 'Post not found' };
      }
      const comments = await this.commentService.findOne(id);
      return { post, comments };
    } catch (error) {
      return { error: error.message };
    }
  }

  async findByUser(userId: string) {
    // get all posts by user
    return this.postModel.find({ userId });
  }

  async remove(id: string) {
    // check post if exists before deleting
    try {
      const post = await this.postModel.findOne({ _id: id });
      if (!post) {
        return { error: 'Post not found' };
      }
      return this.postModel.findByIdAndDelete(id);
    } catch (error) {
      return { error: error.message };
    }
  }

  //   update(id: number, updateDonatorDto: UpdateDonatorDto) {
  //     return `This action updates a #${id} user`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} user`;
  //   }
}
