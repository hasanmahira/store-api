import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookStoreEntity } from 'src/entities/bookStore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookStoreService {
  constructor(
    @InjectRepository(BookStoreEntity)
    private readonly bookStoreRepository: Repository<BookStoreEntity>,
  ) {}

  async findAll(): Promise<BookStoreEntity[]> {
    return this.bookStoreRepository.find();
  }

  async findById(id: number): Promise<BookStoreEntity | undefined> {
    return this.bookStoreRepository.findOneBy({ id: id });
  }

  async create(bookStore: BookStoreEntity): Promise<BookStoreEntity> {
    return this.bookStoreRepository.save(bookStore);
  }

  async update(id: number, bookStore: BookStoreEntity): Promise<BookStoreEntity | undefined> {
    await this.bookStoreRepository.update(id, bookStore);
    return this.bookStoreRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.bookStoreRepository.delete(id);
  }
}
