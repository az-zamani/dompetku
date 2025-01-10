// src/categories/categories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async createCategory(userId: string, name: string): Promise<Category> {
    const category = new this.categoryModel({ userId, name });
    return category.save();
  }

  async getCategoriesByUser(userId: string): Promise<Category[]> {
    return this.categoryModel.find({ userId }).exec();
  }

  async updateCategory(categoryId: string, name: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(categoryId, { name }, { new: true });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(categoryId);
    if (!result) throw new NotFoundException('Category not found');
  }
}
