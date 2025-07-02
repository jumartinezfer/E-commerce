import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from '../entities/products.entity'
import { AuthGuard } from '../auth/guards/auth.guard'
import { Roles } from '../decorators/roles/roles.decorator'
import { Role } from '../enum/roles.enum'
import { RolesGuard } from '../auth/guards/roles.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Products controller endpoints')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.productsService.findAll(page, limit)
  }

  @Get('seeder')
  async addProducts() {
    return await this.productsService.addProducts()
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.findOne(id)
  }

  @Post()
  async addOne(@Body() createProduct: Product) {
    return await this.productsService.addOne(createProduct)
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async update(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() updateProduct: Product,
  ) {
    return await this.productsService.update(id, updateProduct)
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.remove(id)
  }
}
