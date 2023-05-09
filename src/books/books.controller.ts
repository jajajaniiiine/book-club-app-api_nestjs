/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getAllBooks() {
    console.log('GET ALL BOOKS!');
    return await this.booksService.getAllBooks();
  }
  
  @Get(':bookId')
  getSingleBook(@Param('bookId') bookId: string) {
    console.log('GET SINGLE BOOKS!', bookId);
    return this.booksService.getBookById(bookId);
  }
  
  @Post('add')
  addNewBook(@Body() body: any) {
    console.log('ADD NEW BOOK!', body);
    return this.booksService.createNewBook(body);
  }
  
  @Patch(':bookId')
  updateBook(@Param('bookId') bookId: string, @Body() body: any) {
    console.log('UPDATE BOOK!', bookId);
    return this.booksService.updateBookById(bookId, body);
  }
  
  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string) {
    console.log('DELETE BOOK!', bookId);
    return this.booksService.deleteBookById(bookId);
  }
}
