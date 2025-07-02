import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateOrderDto } from './create-order.dto'
import { OrdersService } from './orders.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Order controller endpoints')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async addOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.addOrder(createOrderDto)
  }

  @Get('id')
  async getOrder(@Param('id') id: string) {
    return await this.ordersService.getOrder(id)
  }
}
