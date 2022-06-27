import { PostModule } from './../post/post.module';
import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DonatorModule } from 'src/donator/donator.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.get('DATABASE_URI'),
        };
        return options;
      },
      inject: [ConfigService],
    }),
    DonatorModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
