import { Injectable } from '@nestjs/common'
import { usersRepository } from '../users/users.repository'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: usersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email)
    const isPasswordMatch = await bcrypt.compare(password, user.password) // desencripta el password y lo guarda

    if (!user || !isPasswordMatch) {
      return 'las credenciales no son validas'
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    }

    const token = this.jwtService.sign(userPayload)

    return {
      token,
      message: 'usuario logueado con exito',
    }
  }

  async signUp(user: CreateUserDto) {
    const foundUser = await this.usersRepository.findByEmail(user.email)

    if (foundUser) {
      return 'El usuario ya existe'
    }

    if (user.password !== user.confirmPassword) {
      return 'las contraseñas no coinciden'
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)

    if (!hashedPassword) {
      return 'hubo un error al hashear el password'
    }
    await this.usersRepository.addOne({
      ...user,
      password: hashedPassword,
    })

    const { password, confirmPassword, ...userWithoutPass } = user
    return userWithoutPass
  }
}

