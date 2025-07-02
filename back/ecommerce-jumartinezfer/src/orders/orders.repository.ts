import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from '../entities/orders.entity'
import { User } from '../entities/users.entity'
import { OrderDetail } from '../entities/orders-details.entity'

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async createOrder(
    date: Date,
    user: User,
    orderDetail: OrderDetail,
  ): Promise<Order> {
    const newOrder = this.orderRepo.create({
      date,
      user,
      orderDetail,
    })

    return this.orderRepo.save(newOrder)
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['user', 'orderDetail', 'orderDetail.products'],
    })
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'orderDetail', 'orderDetail.products'],
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.orderRepo.delete(id)
  }

  async updateOrder(id: string, updatedFields: Partial<Order>): Promise<Order> {
    await this.orderRepo.update(id, updatedFields)
    const updatedOrder = await this.findById(id)
    if (!updatedOrder) {
      throw new Error(`Order with id ${id} not found`)
    }
    return updatedOrder // devuelve la versión actualizada
  }
}
