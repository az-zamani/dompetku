// src/budgets/budgets.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from './schemas/budget.schema';

@Injectable()
export class BudgetsService {
  constructor(@InjectModel(Budget.name) private budgetModel: Model<Budget>) {}

  async createBudget(userId: string, categoryId: string, limit: number): Promise<Budget> {
    const budget = new this.budgetModel({ userId, categoryId, limit });
    return budget.save();
  }

  async getBudgetsByUser(userId: string): Promise<Budget[]> {
    return this.budgetModel.find({ userId }).populate('categoryId').exec();
  }

  async updateBudget(budgetId: string, limit: number): Promise<Budget> {
    const budget = await this.budgetModel.findByIdAndUpdate(budgetId, { limit }, { new: true });
    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  async deleteBudget(budgetId: string): Promise<void> {
    const result = await this.budgetModel.findByIdAndDelete(budgetId);
    if (!result) throw new NotFoundException('Budget not found');
  }
}
