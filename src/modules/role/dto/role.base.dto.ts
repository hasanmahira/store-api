import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionItemDto } from 'src/modules/permission/dto/permission.item.dto';

export class RoleBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: false }))
  name: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => PermissionItemDto))
  @decorate(ApiProperty({ type: [String], required: false }))
  permissions?: PermissionItemDto[];
}
