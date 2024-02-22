import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { UserItemDto } from './dto/user.item.dto';
import { UserCreateDto } from './dto/user.create.dto';

@ApiTags('users')
@Controller('users')
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
  @ApiExtraModels(UserItemDto)
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      $ref: getSchemaPath(UserItemDto),
    },
  })
  // @Roles(Role.WRITE)
  // @UseGuards(AuthGuard('basic'), RolesGuard)
  async create(@Body() createUserDto: UserCreateDto): Promise<UserItemDto> {
    return this.userService.create(createUserDto);
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
