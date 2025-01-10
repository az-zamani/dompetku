// src/categories/categories.controller.ts
import { Controller, Post, Get, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
async createCategory(@Req() req, @Body('name') name: string) {
  console.log(req.user); // Periksa apakah userId tersedia
  const userId = req.user.userId;
  return this.categoriesService.createCategory(userId, name);
}


  @Get()
  async getCategories(@Req() req) {
    const userId = req.user.userId;
    return this.categoriesService.getCategoriesByUser(userId);
  }

  @Patch(':id')
  async updateCategory(@Param('id') categoryId: string, @Body('name') name: string) {
    return this.categoriesService.updateCategory(categoryId, name);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') categoryId: string) {
    return this.categoriesService.deleteCategory(categoryId);
  }
}
