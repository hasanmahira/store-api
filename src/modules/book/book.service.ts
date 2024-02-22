import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  async findById(id: number): Promise<BookEntity | undefined> {
    return this.bookRepository.findOneBy({ id: id });
  }

  async create(book: BookEntity): Promise<BookEntity> {
    return this.bookRepository.save(book);
  }

  async update(id: number, book: BookEntity): Promise<BookEntity | undefined> {
    await this.bookRepository.update(id, book);
    return this.bookRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
