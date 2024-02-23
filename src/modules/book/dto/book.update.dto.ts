import 'reflect-metadata';
import { Mixin } from 'ts-mixer';
import { BookBaseDto } from './book.base.dto';

export class BookUpdateDto extends Mixin(BookBaseDto) {}
