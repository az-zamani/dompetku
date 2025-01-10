// src/budgets/budgets.controller.ts
import { Controller, Post, Get, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  async createBudget(
    @Req() req,
    @Body('categoryId') categoryId: string,
    @Body('limit') limit: number,
  ) {
    const userId = req.user.userId;
    return this.budgetsService.createBudget(userId, categoryId, limit);
  }

  @Get()
  async getBudgets(@Req() req) {
    const userId = req.user.userId;
    return this.budgetsService.getBudgetsByUser(userId);
  }

  @Patch(':id')
  async updateBudget(@Param('id') budgetId: string, @Body('limit') limit: number) {
    return this.budgetsService.updateBudget(budgetId, limit);
  }

  @Delete(':id')
  async deleteBudget(@Param('id') budgetId: string) {
    return this.budgetsService.deleteBudget(budgetId);
  }
}
