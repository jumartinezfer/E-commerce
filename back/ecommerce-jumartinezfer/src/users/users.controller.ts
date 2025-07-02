import {
  Body,
  Controller,
  Delete,
  Get,
  //HttpCode,
  //HttpStatus,
  Param,
  ParseUUIDPipe,
  // Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
//import { AuthGuard } from '../auth/auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthGuard } from '../auth/guards/auth.guard'
import { Roles } from '../decorators/roles/roles.decorator'
import { Role } from '../enum/roles.enum'
import { RolesGuard } from '../auth/guards/roles.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('User controller endpoints') //sirve para organizar la etiqueta
@Controller('users') //decorador que representa el controlador
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('list') //decorador que representa la solicitud HTTP, pide la informacion
  //@HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard) // es un guard que proteje las rutas y ayuda con la autenticacion del usuario por medio de contra  y email
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1,
  ) {
    //se le da el parametro por query de la paginacion
    return await this.usersService.findAll(page, limit)
  }

  @ApiBearerAuth()
  @Get(':id') //decorador que representa la solicitud HTTP, pide la informacion
  //@HttpCode(HttpStatus.OK) //da el status 200
  @UseGuards(AuthGuard)
  async fidOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.findOne(id)
  }

  @ApiBearerAuth()
  @Put(':id') //decorador que representa la solicitud HTTP, modifica la informacion
  //@HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: CreateUserDto,
  ) {
    return await this.usersService.update(id, updateUser)
  }

  @ApiBearerAuth()
  @Delete(':id') //decorador que representa la solicitud HTTP, elimina la informacion
  //@HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.remove(id)
  }
}
// @Post() //decorador que representa la solicitud HTTP, postea la informacion
// //@HttpCode(HttpStatus.CREATED) //da el estatus 201
// async addOne(@Body() createUser: CreateUserDto) {
//   return await this.usersService.addOne(createUser)
// }
