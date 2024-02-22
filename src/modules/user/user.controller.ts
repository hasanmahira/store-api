import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { UserItemDto } from './dto/user.item.dto';

@Controller('users')
@ApiTags('users')
// @ApiSecurity('basic')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiExtraModels(UserItemDto)
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(UserItemDto),
    },
  })
  // @Users(User.WRITE, User.READ)
  // @UseGuards(AuthGuard('basic'), UsersGuard)
  findById(@Param('id') id: number): Promise<UserEntity | undefined> {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UserEntity): Promise<UserEntity | undefined> {
    return this.userService.update(Number(id), user);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(Number(id));
  }
}
