// src/transactions/transactions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<Transaction>) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async findAll(userId: string): Promise<Transaction[]> {
    // Filter transaksi berdasarkan userId
    return this.transactionModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Transaction> {
    // Cari transaksi berdasarkan ID dan userId
    const transaction = await this.transactionModel.findOne({ _id: id, userId }).exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found or not accessible`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto, userId: string): Promise<Transaction> {
    // Update transaksi berdasarkan ID dan userId
    const transaction = await this.transactionModel.findOneAndUpdate(
      { _id: id, userId }, // Pastikan hanya transaksi milik user yang bisa diupdate
      updateTransactionDto,
      { new: true },
    ).exec();

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found or not accessible`);
    }
    return transaction;
  }

  async remove(id: string, userId: string): Promise<Transaction> {
    // Hapus transaksi berdasarkan ID dan userId
    const transaction = await this.transactionModel.findOneAndDelete({ _id: id, userId }).exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found or not accessible`);
    }
    return transaction;
  }
}
