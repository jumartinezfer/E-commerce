import { Injectable } from '@nestjs/common'
import { usersRepository } from './users.repository'
import { User } from '../entities/users.entity'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: usersRepository) {}

  async findAll(page: number, limit: number) {
    return await this.usersRepository.findAll(page, limit)
  }

  async addOne(user: Partial<User>) {
    //este servicio crea un usuario
    return await this.usersRepository.addOne(user)
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id)
  }

  async update(id: string, user: Partial<User>) {
    //este servicio actualiza un usuario por medio de un id
    return await this.usersRepository.update(id, user)
  }

  async remove(id: string) {
    //este servicio elimina un usuario por medio del id
    return await this.usersRepository.delete(id)
  }
}
