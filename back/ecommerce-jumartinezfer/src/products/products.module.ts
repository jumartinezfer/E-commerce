import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { ProductsRepository } from './products.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from '../entities/products.entity'
import { Category } from '../entities/categories.entity'
import { CategoriesRepository } from '../categories/categories.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, CategoriesRepository],
})
export class ProductsModule {}
