import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from 'src/entities/products.entity'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  getProductList() {
    return this.productsService.findAll()
  }

  @Post()
  addOne(@Body() createProduct: Product) {
    return this.productsService.addOne(createProduct)
  }

  @Get(':id')
  fidOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProduct: Product) {
    return this.productsService.update(id, updateProduct)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}
