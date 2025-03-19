import { Product } from 'src/entities/products.entity'

export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'teclado',
      description: 'indispensable',
      price: 300,
      stock: true,
      imgUrl: 'www.algo.com/product1.jpg',
    },
    {
      id: 2,
      name: 'mouse',
      description: 'indispensable',
      price: 100,
      stock: false,
      imgUrl: 'www.algo.com/product2.jpg',
    },
  ]

  findAll(): Product[] {
    return this.products
  }
}
