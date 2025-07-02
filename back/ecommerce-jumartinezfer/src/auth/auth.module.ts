import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { usersRepository } from '../users/users.repository'
import { User } from '../entities/users.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController], // son los que manejan la logica del servidor, solicita al servicio la informacion y la devuelve al usuario
  providers: [AuthService, usersRepository],
})
export class AuthModule {}
