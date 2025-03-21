import { Injectable } from '@nestjs/common'
import { usersRepository } from 'src/users/users.repository'

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: usersRepository) {}

  signIn(email: string, password: string): string {
    const user = this.usersRepository.findByEmail(email)
    if (!user || user?.password !== password) {
      return 'Credenciales invalidas'
    }
    return 'Login exitoso'
  }
}
