// src/budgets/budgets.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { Budget, BudgetSchema } from './schemas/budget.schema';
import { CategoriesModule } from '../categories/categories.module'; // Mengimpor CategoriesModule jika diperlukan untuk populate category

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Budget.name, schema: BudgetSchema },
    ]),
    CategoriesModule, // Jika menggunakan category untuk populate
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
  exports: [BudgetsService], // Optional, jika ingin digunakan di modul lain
})
export class BudgetsModule {}
