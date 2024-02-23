import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { PermissionItemDto } from './dto/permission.item.dto';
import { PermissionUpdateDto } from './dto/permission.update.dto';
import { PermissionCreateDto } from './dto/permission.create.dto';

@Controller('permissions')
@ApiTags('permissions')
// @ApiSecurity('basic')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll(): Promise<PermissionItemDto[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @ApiExtraModels(PermissionItemDto)
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(PermissionItemDto),
    },
  })
  // @Permissions(Permission.WRITE, Permission.READ)
  // @UseGuards(AuthGuard('basic'), PermissionsGuard)
  findById(@Param('id') id: number): Promise<PermissionItemDto | undefined> {
    return this.permissionService.findById(id);
  }

  @Post()
  create(@Body() permission: PermissionCreateDto): Promise<PermissionItemDto> {
    return this.permissionService.create(permission);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() permission: PermissionUpdateDto): Promise<PermissionItemDto | undefined> {
    return this.permissionService.update(Number(id), permission);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.permissionService.delete(Number(id));
  }
}
