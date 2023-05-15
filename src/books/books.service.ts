/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Books } from 'src/schema/books.schema';
import * as randomize from 'randomatic';
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
    const singleBook = await this.booksModel.findOne({ bookId: id });
    if (!singleBook) {
      throw new NotFoundException('No Document Found!');
    }
    return singleBook;
  }

  async createNewBook(body: any) {
    let bookId = "";
    while (true) {
      bookId = randomize('0', 12);
      const duplicateBook = await this.booksModel.findOne({ bookId: bookId });
      if (!duplicateBook) {
        break;
      }
    }

    const newBook = {
      bookId,
      ...body,
    }

    return this.booksModel.create(newBook);
  }

  async updateBookById(id: string, body: any) {
    return await this.booksModel.findOneAndUpdate({ bookId: id }, body, {
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
