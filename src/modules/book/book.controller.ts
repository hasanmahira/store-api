import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { BookEntity } from 'src/entities/book.entity';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { BookItemDto } from './dto/book.item.dto';

@Controller('books')
@ApiTags('books')
// @ApiSecurity('basic')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(): Promise<BookEntity[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiExtraModels(BookItemDto)
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(BookItemDto),
    },
  })
  // @Books(Book.WRITE, Book.READ)
  // @UseGuards(AuthGuard('basic'), BooksGuard)
  findById(@Param('id') id: number): Promise<BookEntity | undefined> {
    return this.bookService.findById(id);
  }

  @Post()
  create(@Body() book: BookEntity): Promise<BookEntity> {
    return this.bookService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: BookEntity): Promise<BookEntity | undefined> {
    return this.bookService.update(Number(id), book);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.bookService.delete(Number(id));
  }
}
