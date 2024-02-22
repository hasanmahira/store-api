import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateResponseMetadataDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(ApiProperty({ type: Number, required: true }))
  itemCount: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(ApiProperty({ type: Number, required: true }))
  total: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(ApiProperty({ type: Number, required: true }))
  limit: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(ApiProperty({ type: Number, required: true }))
  totalPages: number;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(ApiProperty({ type: Number, required: true }))
  page: number;
}
