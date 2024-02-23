import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { BookItemDto } from './dto/book.item.dto';
import { BookUpdateDto } from './dto/book.update.dto';
import { BookCreateDto } from './dto/book.create.dto';

@Controller('books')
@ApiTags('books')
// @ApiSecurity('basic')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Get all books' })
  @Get()
  findAll(): Promise<BookItemDto[]> {
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
  findById(@Param('id') id: number): Promise<BookItemDto | undefined> {
    return this.bookService.findById(id);
  }

  @Post()
  create(@Body() book: BookCreateDto): Promise<BookItemDto> {
    return this.bookService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: BookUpdateDto): Promise<BookItemDto | undefined> {
    return this.bookService.update(Number(id), book);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.bookService.delete(Number(id));
  }
}
