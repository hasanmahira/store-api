import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal128 } from 'typeorm';

export class BookBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: false }))
  title: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: false }))
  author: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: false }))
  description: string;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsNumber())
  @decorate(ApiProperty({ type: Decimal128, required: false }))
  price: number;
}
