import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { AuthBaseDto } from './auth.base.dto';

export class AuthLoginDto extends Mixin(AuthBaseDto) {}
