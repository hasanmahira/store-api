import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { UserBaseDto } from './user.base.dto';

export class UserUpdateDto extends Mixin(UserBaseDto) {}
