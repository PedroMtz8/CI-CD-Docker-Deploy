import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    return { message: 'User list', users };
  }

  @Get(':id')
  async getUserById(@Param("id") id: string) {
    return await this.usersService.getUserById(id);
  }


  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

}
