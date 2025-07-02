import { ApiProperty } from '@nestjs/swagger'

export class CreateOrderProductDto {
  id: string
}

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    description: 'Id del usuario',
  })
  userId: string

  @ApiProperty({
    required: true,
    description: 'Producto del usuario',
  })
  products: CreateOrderProductDto[]
}
