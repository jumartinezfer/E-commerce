import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggerMiddleware } from './middlewares/logger-middleware'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('eCommerce API m4')
    .setDescription('Documentacion de la API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  const loggerMiddleware = new LoggerMiddleware()
  app.use(loggerMiddleware.use)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
