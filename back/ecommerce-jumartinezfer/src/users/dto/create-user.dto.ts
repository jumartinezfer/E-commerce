import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'nombre - nombre de usuario',
    example: 'pepitoPerez',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string

  @ApiProperty({
    required: true,
    description: 'email - email de usuario',
    example: 'pepitoPerez@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    required: true,
    description: 'password - contraseña de usuario',
    example: 'Clave!123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  })
  @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
    message:
      'solo se permiten los siguientes simbolos: !@#$%^&* (sin otros caracteres especiales)',
  })
  @Matches(/[A-Za-z\d!@#$%^&*]/, {
    message: 'Debe incluir al menos uno de los siguientes simbolos: !@#$%^&*',
  })
  password: string

  @IsNotEmpty()
  confirmPassword: string

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string

  @IsNotEmpty()
  @IsNumber()
  phone: number

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string

  @IsEmpty()
  isAdmin?: boolean
}
