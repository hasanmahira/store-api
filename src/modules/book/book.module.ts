import 'reflect-metadata';
import { Global, Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../../entities/book.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  providers: [BookService],
  controllers: [BookController],
  exports: [TypeOrmModule, BookModule, BookService],
})
export class BookModule {}
