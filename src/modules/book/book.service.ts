import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { BookItemDto } from './dto/book.item.dto';
import { BookCreateDto } from './dto/book.create.dto';
import { BookUpdateDto } from './dto/book.update.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<BookItemDto[]> {
    return this.bookRepository.find();
  }

  async findById(id: number): Promise<BookItemDto | undefined> {
    return this.bookRepository.findOneBy({ id: id });
  }

  async create(book: BookCreateDto): Promise<BookItemDto> {
    return this.bookRepository.save(book);
  }

  async update(id: number, book: BookUpdateDto): Promise<BookItemDto | undefined> {
    await this.bookRepository.update(id, book);
    return this.bookRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
