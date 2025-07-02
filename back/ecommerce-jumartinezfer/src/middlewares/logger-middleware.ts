import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const date = new Date().toLocaleString()
    console.log(
      `${date} -- Logger Middleware global ${req.method} en la ruta ${req.url}`,
    )

    next()
  }
}
