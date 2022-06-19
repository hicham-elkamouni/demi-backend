import { IsString, IsInt, IsEmail, Length, IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  @IsString()
  @IsNotEmpty()
  type: 'donation' | 'request' | 'campaign';

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
