import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionBaseDto {
  @decorate(Expose())
  @decorate(IsNotEmpty())
  @decorate(IsString())
  @decorate(ApiProperty({ type: String, required: false }))
  name: string;
}
