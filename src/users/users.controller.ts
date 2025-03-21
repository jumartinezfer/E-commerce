import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from 'src/entities/users.entity'
import { validateUser } from 'src/utils/validate'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('users') //decorador que representa el controlador
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list') //decorador que representa la solicitud HTTP, pide la informacion
  @HttpCode(HttpStatus.OK)
  //@UseGuards(AuthGuard) // es un guard que proteje las rutas y ayuda con la autenticacion del usuario por medio de contra  y email
  getUsersList(@Query('page') page: number, @Query('limit') limit: number) {
    //se le da el parametro por query de la paginacion
    return this.usersService.findAll(page, limit)
  }

  @Post() //decorador que representa la solicitud HTTP, postea la informacion
  @HttpCode(HttpStatus.CREATED) //da el estatus 201
  addOne(@Body() createUser: User) {
    if (validateUser(createUser)) {
      return this.usersService.addOne(createUser)
    } else {
      return 'usuario no valido'
    }
  }

  @Get(':id') //decorador que representa la solicitud HTTP, pide la informacion
  @HttpCode(HttpStatus.OK) //da el status 200
  //@UseGuards(AuthGuard)
  fidOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Put(':id') //decorador que representa la solicitud HTTP, modifica la informacion
  @HttpCode(HttpStatus.OK)
  //@UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUser: User) {
    if (validateUser(updateUser)) {
      return this.usersService.update(id, updateUser)
    } else {
      return 'usuario no valido'
    }
  }

  @Delete(':id') //decorador que representa la solicitud HTTP, elimina la informacion
  @HttpCode(HttpStatus.OK)
  //@UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
