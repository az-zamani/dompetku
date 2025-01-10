// src/budgets/schemas/budget.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Budget extends Document {
  @Prop({ required: true })
  userId: string; // Relasi ke pengguna

  @Prop({ required: true })
  categoryId: string; // Relasi ke kategori

  @Prop({ required: true })
  limit: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
