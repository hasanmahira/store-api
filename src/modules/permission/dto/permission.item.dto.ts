import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { BaseFieldsDto } from '../../../common-dtos/base.fields.dto';

export class PermissionItemDto extends Mixin(BaseFieldsDto) {}
