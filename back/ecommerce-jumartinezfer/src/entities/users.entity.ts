import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './orders.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string

  @Column({
    type: 'int',
  })
  phone: number

  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string

  @Column({
    type: 'text',
  })
  address: string

  @Column({
    type: 'varchar',
    length: 20,
  })
  city: string

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]
}
