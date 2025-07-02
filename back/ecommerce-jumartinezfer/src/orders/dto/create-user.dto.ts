import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator'

export class CreateOrderProductDto {
  @IsUUID()
  @IsNotEmpty()
  is: string
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsArray()
  @ArrayMinSize(1, { message: 'debe incluir al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  product: CreateOrderProductDto[]
}
