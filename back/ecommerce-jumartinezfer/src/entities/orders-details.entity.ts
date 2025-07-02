import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './orders.entity'
import { Product } from './products.entity'

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'order_details_products',
  })
  products: Product[]
}
