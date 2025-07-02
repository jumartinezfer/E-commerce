import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '../auth/guards/auth.guard'
import { CreateOrderDto } from '../dto/create-order.dto'
import { OrdersService } from '../dto/orders.service'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() CreateOrderDto: CreateOrderDto) {
    return await this.ordersService.addOrder(CreateOrderDto)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.getOrder(id)
  }
}
