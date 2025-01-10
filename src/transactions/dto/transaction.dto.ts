// src/transactions/dto/transaction.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  type: string; // income or expense

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  date?: string; 
}

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  type?: string; // income or expense

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  date?: string; // Format ISO (yyyy-MM-dd atau yyyy-MM-ddTHH:mm:ssZ)

}