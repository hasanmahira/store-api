import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { RoleBaseDto } from './role.base.dto';

export class RoleItemDto extends Mixin(RoleBaseDto) {}
