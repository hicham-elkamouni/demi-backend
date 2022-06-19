import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
