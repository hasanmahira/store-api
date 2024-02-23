import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { BookBaseDto } from './book.base.dto';

export class BookItemDto extends Mixin(BookBaseDto) {}
