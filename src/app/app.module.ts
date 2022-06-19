import { PostModule } from './../post/post.module';
import { Module } from '@nestjs/common';
import { AppController } from '../testModule/app.controller';
import { AppService } from '../testModule/app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DonatorModule } from 'src/donator/donator.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
