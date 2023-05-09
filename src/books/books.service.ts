/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Books } from 'src/schema/books.schema';
@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Books') private readonly booksModel: Model<Books>,
  ) {}

  async getAllBooks() {
    const books = await this.booksModel.find();
    if (!books) {
      throw new NotFoundException('No Documents Found!');
    }
    return books;
  }

  async getBookById(id: any) {
    const singleBook = await this.booksModel.findById(id);
    if (!singleBook) {
      throw new NotFoundException('No Document Found!');
    }
    return singleBook;
  }

  createNewBook(body: any) {
    return this.booksModel.create(body);
  }

  updateBookById(id: string, body: any) {
    return this.booksModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      strictQuery: 'throw',
    });
  }

  deleteBookById(id: string) {
    return this.booksModel.findByIdAndDelete(id, {
      new: true,
      runValidators: true,
      strictQuery: 'throw',
    });
  }
}
