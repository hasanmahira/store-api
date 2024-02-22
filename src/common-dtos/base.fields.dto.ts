import { IsDate, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseFieldsDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => Number))
  @decorate(IsInt())
  @decorate(ApiProperty({ type: Number, required: true }))
  id: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      oneOf: [{ type: 'string' }],
    },
    required: false,
  })
  extra?: { [key: string]: any };

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => Date))
  @decorate(IsDate())
  @decorate(ApiProperty({ type: Date, required: true }))
  created_at: Date;

  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(Type(() => Date))
  @decorate(IsDate())
  @decorate(ApiProperty({ type: Date, required: true }))
  updated_at: Date;
}
