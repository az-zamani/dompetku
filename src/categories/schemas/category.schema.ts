// src/categories/schemas/category.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userId: string; // Relasi ke pengguna

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
