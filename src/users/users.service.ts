import { Injectable } from '@nestjs/common'
import { usersRepository } from './users.repository'
import { User } from 'src/entities/users.entity'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: usersRepository) {}
  findAll(page: number, limit: number): Omit<User, 'password'>[] {
    const foundUsers = this.usersRepository.findAll()
    return foundUsers.map(({ password, ...rest }) => rest)
  }

  addOne(createUser: User): string {
    //este servicio crea un usuario
    this.usersRepository.addOne(createUser)
    return `el usuario #${createUser.id} ha sido creado`
  }

  findOne(id: string): Omit<User, 'password'> | undefined {
    //el omit es para omitir un parametro, en este caso password, solo trae el usuario sin la contraseña
    const user = this.usersRepository.findOne(id)
    if (user) {
      const { password, ...rest } = user
      return rest
    }
    return undefined
  }

  update(id: string, updateUser: User): string {
    //este servicio actualiza un usuario por medio de un id
    return this.usersRepository.update(id, updateUser)
  }

  remove(id: string): string {
    //este servicio elimina un usuario por medio del id
    return this.usersRepository.delete(id)
  }
}
