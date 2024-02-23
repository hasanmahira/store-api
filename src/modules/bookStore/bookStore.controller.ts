import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { BookStoreService } from './bookStore.service';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { BookStoreItemDto } from './dto/bookStore.item.dto';
import { BookStoreCreateDto } from './dto/bookStore.create.dto';
import { BookStoreUpdateDto } from './dto/bookStore.update.dto';

@Controller('bookStores')
@ApiTags('bookStores')
// @ApiSecurity('basic')
export class BookStoreController {
  constructor(private readonly bookStoreService: BookStoreService) {}

  @ApiOperation({ summary: 'Get all book Stores' })
  @Get()
  findAll(): Promise<BookStoreItemDto[]> {
    return this.bookStoreService.findAll();
  }

  @Get(':id')
  @ApiExtraModels(BookStoreItemDto)
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(BookStoreItemDto),
    },
  })
  // @BookStores(BookStore.WRITE, BookStore.READ)
  // @UseGuards(AuthGuard('basic'), BookStoresGuard)
  findById(@Param('id') id: number): Promise<BookStoreItemDto | undefined> {
    return this.bookStoreService.findById(id);
  }

  @Post()
  create(@Body() bookStore: BookStoreCreateDto): Promise<BookStoreItemDto> {
    return this.bookStoreService.create(bookStore);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bookStore: BookStoreUpdateDto): Promise<BookStoreItemDto | undefined> {
    return this.bookStoreService.update(Number(id), bookStore);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.bookStoreService.delete(Number(id));
  }
}
