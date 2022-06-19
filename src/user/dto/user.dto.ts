import { IsString, IsInt, IsEmail, Length } from 'class-validator'

export class UserDto {
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
    diabetesType: 'A' | 'B';

    @IsString()
    patientCode: string;

}