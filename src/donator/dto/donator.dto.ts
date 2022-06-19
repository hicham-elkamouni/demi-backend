import { IsString, IsInt, IsEmail, Length } from 'class-validator';

export class DonatorDto {
  @IsString()
  fName: string;

  @IsString()
  lName: string;

  @IsEmail()
  email: string;

  @Length(5, 20)
  password: string;

  @IsString()
  phone: string;

  @IsString()
  cin: string;
}
