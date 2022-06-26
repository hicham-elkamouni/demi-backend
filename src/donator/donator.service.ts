import { LoginDonatorDto } from './dto/login-donator.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDonatorDto } from './dto/create-donator.dto';
import { UpdateDonatorDto } from './dto/update-donator.dto';
import { Donator } from './donator.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import * as argon from 'argon2';
@Injectable()
export class DonatorService {
  constructor(
    @InjectModel(Donator.name) private readonly donatorModel: Model<Donator>,
    private readonly authService: AuthService,
  ) {}

  async create(createDonatorDto: CreateDonatorDto) {
    try {
      const user = await this.donatorModel.findOne({
        email: createDonatorDto.email,
      });
      if (user) throw new Error('Email already exists');

      // hash the password
      const password = await argon.hash(createDonatorDto.password);

      // create the user
      const createdUser = new this.donatorModel({
        ...createDonatorDto,
        password,
      });

      let NewUser = await createdUser.save();

      if (!createdUser) throw new Error('Failed to create user');

      // create the token
      const token = await this.authService.createToken(createdUser, 'USER');

      return { token, NewUser };
    } catch (error) {
      return { error: error.message };
    }
  }

  async login(LoginDonatorDto: CreateDonatorDto) {
    try {
      const { email, password } = LoginDonatorDto;

      // check the email provided
      const user = await this.donatorModel.findOne({ email });
      if (!user) throw new Error('invalid credentials');

      // check the password provided
      const passwordMatches = await argon.verify(user.password, password);

      if (!passwordMatches) throw new Error('something went wrong');

      // create the token
      const token = await this.authService.createToken(user, 'USER');

      return { token, user };
    } catch (error) {
      return { error: error.message };
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateDonatorDto: UpdateDonatorDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
