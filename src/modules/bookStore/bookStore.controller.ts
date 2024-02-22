import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { BookStoreService } from './bookStore.service';
import { BookStoreEntity } from 'src/entities/bookStore.entity';
import { ApiExtraModels, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { BookStoreItemDto } from './dto/bookStore.item.dto';

@Controller('bookStores')
@ApiTags('bookStores')
// @ApiSecurity('basic')
export class BookStoreController {
  constructor(private readonly bookStoreService: BookStoreService) {}

  @Get()
  findAll(): Promise<BookStoreEntity[]> {
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
  findById(@Param('id') id: number): Promise<BookStoreEntity | undefined> {
    return this.bookStoreService.findById(id);
  }

  @Post()
  create(@Body() bookStore: BookStoreEntity): Promise<BookStoreEntity> {
    return this.bookStoreService.create(bookStore);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bookStore: BookStoreEntity): Promise<BookStoreEntity | undefined> {
    return this.bookStoreService.update(Number(id), bookStore);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.bookStoreService.delete(Number(id));
  }
}
