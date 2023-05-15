/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BooksDocument = HydratedDocument<Books>;

@Schema({ timestamps: true, collection: 'books' })
export class Books {
  @Prop({ required: true, unique: true })
  bookId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  category: string[];

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  price: number;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
