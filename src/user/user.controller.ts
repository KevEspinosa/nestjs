import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetIdUserDto, GetUserDto } from './dtos/get-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<GetIdUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async getAll(): Promise<GetUserDto[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<GetUserDto> {
    return this.userService.getById(id);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<GetIdUserDto> {
    return this.userService.updateById(id, user);
  }
}
