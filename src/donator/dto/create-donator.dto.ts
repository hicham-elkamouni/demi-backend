import { PartialType } from '@nestjs/mapped-types';
import { DonatorDto } from './donator.dto';

export class CreateDonatorDto extends PartialType(DonatorDto) {}
