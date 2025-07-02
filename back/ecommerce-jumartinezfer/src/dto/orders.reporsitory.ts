import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderDetail } from '../entities/orders-details.entity'
import { Order } from '../entities/orders.entity'
import { Product } from '../entities/products.entity'
import { User } from '../entities/users.entity'
import { In, Repository } from 'typeorm'
import { CreateOrderProductDto } from './create-order.dto'

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(OrderDetail)
    private ordersDetailRepository: Repository<OrderDetail>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addOrder(userId: string, products: CreateOrderProductDto[]) {
    const user = await this.usersRepository.findOneBy({ id: userId })

    if (!user) {
      return 'usuario no encontrado'
    }
    const productIds = products.map((p) => p.id) //aqui se guarda los ids de cada producto que llega

    const dbProducts = await this.productsRepository.findBy({
      id: In(productIds), //el In lo que hace es que busca los id que coincidan dentro del array
    })

    const validProducts = dbProducts.filter((p) => p.stock > 0) //filtra cual es que tiene mas de 0

    //si la cantidad de productos no coincide aparece el mensaje
    if (validProducts.length !== products.length) {
      return 'uno o mas productos no existen o no tienen stock disponible'
    }

    let totalPrice = 0
    const updatedProducts: Product[] = []

    for (const product of validProducts) {
      totalPrice += Number(product.price) //de todos los productos validos que quedan toma el price y lo suma al total

      product.stock -= 1 // baja en uno el stock

      updatedProducts.push(product) // pushea los productos con las modificaciones en  la base de datos
    }

    await this.productsRepository.save(updatedProducts)

    const order = this.ordersRepository.create({
      date: new Date(), //crea un obj que tiene una nueva fecha y le pasa la relacion con el user
      user,
    })

    const savedOrder = await this.ordersRepository.save(order) //guarda la orden

    const orderDetail = this.ordersDetailRepository.create({
      price: Number(totalPrice.toFixed(2)), // crea el detalle de la orden con el precio total, redonde a dos decimales
      products: validProducts,
      order: savedOrder,
    })

    const savedOrderDetail = await this.ordersDetailRepository.save(orderDetail) //guarda el detalle de la orden

    savedOrder.orderDetail = savedOrderDetail
    await this.ordersRepository.save(savedOrder) //asocia la orden guardada

    return {
      orderId: savedOrderDetail.id, //devuelve el id y el precio
      orderDetail: {
        id: savedOrderDetail.id,
        price: savedOrderDetail.price,
      },
    }
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id }, //busca la orden donde el id conincida
      relations: {
        user: true, //trae la relacion con el user orderDetail
        orderDetail: {
          products: true,
        },
      },
    })

    // si la orden no se encuentra envia ese mensaje
    if (!order) {
      return 'orden no encontrada'
    }

    return {
      id: order.id, // en caso que la orden exista retorna los datos requeridos
      date: order.date,
      user: {
        id: order.user.id,
      },
      orderDetail: {
        id: order.orderDetail.id,
        price: order.orderDetail.price,
        products: order.orderDetail.products.map((p) => ({
          id: p.id, //trae los detalles del producto tambien
          name: p.name,
          price: p.price,
          imgUrl: p.imgUrl,
        })),
      },
    }
  }
}
