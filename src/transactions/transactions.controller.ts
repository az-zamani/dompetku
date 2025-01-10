// src/transactions/transactions.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './schemas/transaction.schema';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(@Req() req, @Body() createTransactionDto: CreateTransactionDto) {
    const userId = req.user.userId; // Ambil userId dari JWT
    const transactionData = { ...createTransactionDto, userId }; // Tambahkan userId ke transaksi
    console.log('Data diterima di backend:', transactionData);
    return this.transactionsService.create(transactionData);
  }

  @Get()
  async findAll(@Req() req): Promise<Transaction[]> {
    const userId = req.user.userId; // Ambil userId dari JWT
    return this.transactionsService.findAll(userId); // Panggil service dengan userId
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string): Promise<Transaction> {
    const userId = req.user.userId; // Ambil userId dari JWT
    console.log('Find One - User ID:', userId);
    return this.transactionsService.findOne(id, userId); // Pastikan transaksi milik user yang sesuai
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const userId = req.user.userId; // Ambil userId dari JWT
    const updatedData = { ...updateTransactionDto, userId }; // Pastikan data milik user yang sesuai
    console.log('Update Data:', updatedData);
    return this.transactionsService.update(id, updatedData, userId);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string): Promise<Transaction> {
    const userId = req.user.userId; // Ambil userId dari JWT
    console.log('Delete Request - User ID:', userId);
    return this.transactionsService.remove(id, userId);
  }
}
