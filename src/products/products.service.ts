import { Injectable } from '@nestjs/common'
import { ProductsRepository } from './products.repository'
import { Product } from 'src/entities/products.entity'

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  findAll() {
    return this.productsRepository.findAll()
  }

  addOne(createProduct: Product) {
    return 'esta accion agrega un producto nuevo'
  }

  findOne(id: string) {
    return `esta accion retorna el producto #${id}`
  }

  update(id: string, updateProduct: Product) {
    return `esta accion modifica al producto #${id}`
  }

  remove(id: string) {
    return `esta accion elimina el producto #${id}`
  }
}
