import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { BaseFieldsDto } from '../../../common-dtos/base.fields.dto';

export class UserItemDto extends Mixin(BaseFieldsDto) {}
