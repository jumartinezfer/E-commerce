import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  //esta logica es la que hace funcionar el log in utilizando la contraseña y el email
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const token = request.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException('No hay token')
    }

    try {
      const secret = process.env.JWT_SECRET

      const user = this.jwtService.verify(token, { secret }) //muestra cuando se genera el token
      user.exp = new Date(user.exp * 1000)
      user.iat = new Date(user.iat * 1000)

      if (user.isAdmin) {
        user.roles = ['admin']
      } else {
        user.roles = ['user']
      }

      request.user = user

      return true
    } catch {
      throw new UnauthorizedException('Token invalido')
    }
  }
}
