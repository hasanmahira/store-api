import 'reflect-metadata';
import { Global, Module } from '@nestjs/common';
import { BookStoreController } from './bookStore.controller';
import { BookStoreService } from './bookStore.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookStoreEntity } from '../../entities/bookStore.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BookStoreEntity])],
  providers: [BookStoreService],
  controllers: [BookStoreController],
  exports: [TypeOrmModule, BookStoreModule, BookStoreService],
})
export class BookStoreModule {}
