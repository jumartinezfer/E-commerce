import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { usersRepository } from './users.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entities/users.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController], // son los que manejan la logica del servidor, solicita al servicio la informacion y la devuelve al usuario
  providers: [UsersService, usersRepository], //permite que los módulos y controladores obtengan instancias de estos sin necesidad de crearlas manualmente.
})
export class UsersModule {}
