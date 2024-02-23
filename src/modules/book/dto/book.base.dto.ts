import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal128 } from 'typeorm';
import { BookStoreItemDto } from 'src/modules/bookStore/dto/bookStore.item.dto';

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

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(ValidateIf((object, value) => !!value))
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => BookStoreItemDto))
  @decorate(ApiProperty({ type: [BookStoreItemDto], required: false }))
  roles?: BookStoreItemDto[];
}
