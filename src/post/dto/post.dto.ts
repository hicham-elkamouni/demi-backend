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
  @IsIn(['donation', 'request', 'campaign'])
  type: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
