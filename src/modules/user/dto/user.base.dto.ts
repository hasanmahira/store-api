import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';

export class UserBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: true }))
  username: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: true }))
  password: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: true }))
  email: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsString({ each: true }))
  @decorate(ApiProperty({ type: String, required: true }))
  salt: string;
}
