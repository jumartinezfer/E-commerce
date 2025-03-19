import { Injectable } from '@nestjs/common'
import { usersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: usersRepository) {}
  findAll() {
    return this.usersRepository.findAll()
  }
}
