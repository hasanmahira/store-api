import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { BookStoreBaseDto } from './bookStore.base.dto';

export class BookStoreCreateDto extends Mixin(BookStoreBaseDto) {}
