import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { OrderDetail } from './orders-details.entity'
import { Category } from './categories.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number

  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number

  @Column({
    type: 'text',
    default: 'https://imagenalguna.com.jpg',
  })
  imgUrl: string

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetail: OrderDetail[]

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category
}
