import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DonatorService } from './donator.service';
import { CreateDonatorDto } from './dto/create-donator.dto';
import { UpdateDonatorDto } from './dto/update-donator.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Role } from 'src/decorators/role.decorator';

@Controller('donator')
export class DonatorController {
  constructor(private readonly donatorService: DonatorService) {}

  @Post()
  async create(@Body() createDonatorDto: CreateDonatorDto) {
    console.log('inside create');
    try {
      return this.donatorService.create(createDonatorDto);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post('login')
  async login(@Body() loginDonatorDto: CreateDonatorDto) {
    try {
      return this.donatorService.login(loginDonatorDto);
    } catch (error) {
      return { error: error.message };
    }
  }
  // @Role('USER')
  // @UseGuards(JwtGuard)
  @Get('/test')
  findAll() {
    return this.donatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonatorDto: UpdateDonatorDto) {
    return this.donatorService.update(+id, updateDonatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donatorService.remove(+id);
  }
}
