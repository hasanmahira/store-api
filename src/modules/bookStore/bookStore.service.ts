import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookStoreEntity } from 'src/entities/bookStore.entity';
import { Repository } from 'typeorm';
import { BookStoreCreateDto } from './dto/bookStore.create.dto';
import { BookStoreUpdateDto } from './dto/bookStore.update.dto';
import { BookStoreItemDto } from './dto/bookStore.item.dto';

@Injectable()
export class BookStoreService {
  constructor(
    @InjectRepository(BookStoreEntity)
    private readonly bookStoreRepository: Repository<BookStoreEntity>,
  ) {}

  async findAll(): Promise<BookStoreItemDto[]> {
    return this.bookStoreRepository.find();
  }

  async findById(id: number): Promise<BookStoreItemDto | undefined> {
    return this.bookStoreRepository.findOneBy({ id: id });
  }

  async create(bookStore: BookStoreCreateDto): Promise<BookStoreItemDto> {
    return this.bookStoreRepository.save(bookStore);
  }

  async update(id: number, bookStore: BookStoreUpdateDto): Promise<BookStoreItemDto | undefined> {
    await this.bookStoreRepository.update(id, bookStore);
    return this.bookStoreRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.bookStoreRepository.delete(id);
  }
}
