import { PickType } from '@nestjs/mapped-types';
import { DonatorDto } from './donator.dto';

export class LoginDonatorDto extends PickType(DonatorDto, [
  'email',
  'password',
]) {}
