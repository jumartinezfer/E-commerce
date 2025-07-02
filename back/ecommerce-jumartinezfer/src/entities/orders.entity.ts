import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './users.entity'
import { OrderDetail } from './orders-details.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  date: Date

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn({ name: 'order_detail_id' })
  orderDetail: OrderDetail

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User
}
