import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost/uangku'), AuthModule, TransactionsModule, CategoriesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
