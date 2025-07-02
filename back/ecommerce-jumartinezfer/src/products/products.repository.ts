import { InjectRepository } from '@nestjs/typeorm'
import { Category } from '../entities/categories.entity'
import { Product } from '../entities/products.entity'
import { Repository } from 'typeorm'
import * as data from '../utils/seeders/data.json'

export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  //getProducts se llama findAll
  async findAll(page: number = 1, limit: number = 5): Promise<Product[]> {
    const products = await this.productsRepository.find({
      relations: {
        category: true,
      }, // trae todos los productos con la categoria relacionada
    })

    let inStock = products.filter((product) => product.stock > 0) // es para ver si esta en stock o no

    const starIndex = (page - 1) * limit
    const endIndex = starIndex + +limit // paginacion

    inStock = inStock.slice(starIndex, endIndex) // productos que estan en stock siguiendo la paginacion

    return inStock // devuelve los productos que cumplan con la busqueda
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOneBy({ id }) //se busca por id

    if (!product) {
      return 'product not found' //si no existe devuelve el mensaje
    }
    return product
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find() //trae todas las categorias que estan seedeas

    data?.map(async (element) => {
      const relatedCategory = categories.find(
        (category) => category.name === element.category,
      )

      const product = new Product() //genera un producto nuevo y le agrega las siguientes categorias/relaciones
      product.name = element.name
      product.description = element.description
      product.price = element.price
      product.stock = element.stock
      //posible solucion, realizar una validacion, si no se encuentra relatedCategory lanzar un error
      product.category = relatedCategory

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'stock'], ['name'])
        .execute()
    })
    return 'productos agregados'
  }

  async update(id: string, product: Product) {
    await this.productsRepository.update(id, product) //updatea el id de un producto

    const updateProduct = await this.productsRepository.findOneBy({ id })

    return updateProduct
  }

  async addOne(product: Partial<Product>): Promise<Partial<Product>> {
    const newProduct = await this.productsRepository.save(product) //agrega un producto en la base de datos

    return newProduct
  }

  async remove(id: string): Promise<Partial<Product> | string> {
    const product = await this.productsRepository.findOneBy({ id }) //remueve un producto

    if (!product) {
      return 'Producto no encontrado'
    }
    this.productsRepository.remove(product)

    return product
  }
}

// [
//   {
//     id: '1',
//     name: 'teclado',
//     description: 'indispensable',
//     price: 300,
//     stock: true,
//     imgUrl: 'www.algo.com/product1.jpg',
//   },
//   {
//     id: '2',
//     name: 'mouse',
//     description: 'indispensable',
//     price: 100,
//     stock: false,
//     imgUrl: 'www.algo.com/product2.jpg',
//   },
// ]
