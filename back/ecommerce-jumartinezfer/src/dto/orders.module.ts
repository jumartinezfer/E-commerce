import { Module } from '@nestjs/common'
import { OrderDetail } from '../entities/orders-details.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from '../entities/orders.entity'
import { User } from '../entities/users.entity'
import { Product } from '../entities/products.entity'
import { OrdersRepository } from './orders.reporsitory'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
