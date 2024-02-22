import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { UserBaseDto } from './user.base.dto';

export class UserCreateDto extends Mixin(UserBaseDto) {}
