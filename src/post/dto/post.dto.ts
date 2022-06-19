import {
  IsString,
  IsInt,
  IsEmail,
  Length,
  IsNotEmpty,
  IsIn,
} from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  bloodType: string;

  @IsString()
  @IsNotEmpty()
  type: 'donation' | 'request' | 'campaign';

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
