import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { RoleItemDto } from './dto/role.item.dto';
import { RoleCreateDto } from './dto/role.create.dto';
import { RoleUpdateDto } from './dto/role.update.dto';

@Controller('roles')
@ApiTags('roles')
// @ApiSecurity('basic')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<RoleItemDto[]> {
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
  findById(@Param('id') id: number): Promise<RoleItemDto | undefined> {
    return this.roleService.findById(id);
  }

  @Post()
  create(@Body() role: RoleCreateDto): Promise<RoleItemDto> {
    return this.roleService.create(role);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() role: RoleUpdateDto): Promise<RoleItemDto | undefined> {
    return this.roleService.update(Number(id), role);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.roleService.delete(Number(id));
  }
}
