import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { OrdersRepository } from './orders.repository'
import { Order } from '../entities/orders.entity'
import { OrderDetail } from '../entities/orders-details.entity'
import { Product } from '../entities/products.entity'
import { User } from '../entities/users.entity'
import { UsersModule } from '../users/users.module'
import { ProductsModule } from '../products/products.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, Product, User]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
