import { Module } from '@nestjs/common';
import { DonatorService } from './donator.service';
import { DonatorController } from './donator.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Donator, DonatorSchema } from './donator.schema';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Donator.name, schema: DonatorSchema }]),
    AuthModule,
  ],
  controllers: [DonatorController],
  providers: [DonatorService],
})
export class DonatorModule {}
