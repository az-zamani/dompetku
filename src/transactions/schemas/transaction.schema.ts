// src/transactions/schemas/transaction.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: string; // income or expense

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  categoryId: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
