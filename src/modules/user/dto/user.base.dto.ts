import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';

export class UserBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  @decorate(IsUnique())
  @decorate(ApiProperty({ type: String, required: false }))
  username: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: false }))
  password: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: false }))
  email: string;

  //   @decorate(Expose())
  //   @decorate(IsOptional())
  //   @decorate(ValidateIf((object, value) => !!value))
  //   @decorate(IsArray())
  //   @decorate(IsString({ each: true }))
  //   @decorate(ArrayUnique())
  //   @decorate(ApiProperty({ type: String, required: false }))
  //   salt: string;
}
function IsUnique(): any {
  throw new Error('Function not implemented.');
}
