import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductsService {
  findAll() {
    console.log('llamando /list')
    return 'se llamo el endpoint de productos'
  }
}
