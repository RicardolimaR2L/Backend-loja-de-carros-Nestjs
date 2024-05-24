import { Controller, Get, Post, Body, Param, Delete, BadRequestException, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMessagehelper } from './helpers/message.helpers';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: RegisterUserDto) {
    return this.userService.createUser(dto);
  }
  @Get()
  findAll() {
    return this.userService.findUser();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    if(!user){
      throw new BadRequestException(UserMessagehelper.GET_USER_NOT_FOUND)
    }
    return {
      name: user.name,
      email: user.email,
      id: user._id,
    };
  }

  @Put('updateUser/:id') //inclusão do id como parâmetro de rota 
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    
    await this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.RemoveUser(id);
  }
}
