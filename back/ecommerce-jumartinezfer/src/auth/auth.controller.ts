import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Auth controller endpoints')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials
    return await this.authService.signIn(email, password)
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user)
  }
}
