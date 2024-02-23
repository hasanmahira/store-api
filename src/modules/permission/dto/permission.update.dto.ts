import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { PermissionBaseDto } from './permission.base.dto';

export class PermissionUpdateDto extends Mixin(PermissionBaseDto) {}
