import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from 'src/entities/role.entity';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { RoleItemDto } from './dto/role.item.dto';

@Controller('roles')
@ApiTags('roles')
// @ApiSecurity('basic')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiExtraModels(RoleItemDto)
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(RoleItemDto),
    },
  })
  // @Roles(Role.WRITE, Role.READ)
  // @UseGuards(AuthGuard('basic'), RolesGuard)
  findById(@Param('id') id: number): Promise<RoleEntity | undefined> {
    return this.roleService.findById(id);
  }

  @Post()
  create(@Body() role: RoleEntity): Promise<RoleEntity> {
    return this.roleService.create(role);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() role: RoleEntity): Promise<RoleEntity | undefined> {
    return this.roleService.update(Number(id), role);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.roleService.delete(Number(id));
  }
}
