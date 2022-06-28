import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Donator } from 'src/donator/donator.schema';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  @Prop()
  type: PostType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Donator' })
  createdBy: Donator;
}

export const PostSchema = SchemaFactory.createForClass(Post);

enum PostType {
  donation = 'donation',
  request = 'request',
  campaign = 'campaign',
}
