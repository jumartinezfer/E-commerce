import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import typeorm from './config/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
//import { config } from 'process'
import { CategoriesModule } from './categories/categories.module'
import { FileUploadModule } from './file-upload/file-upload.module'
import { OrdersModule } from './dto/orders.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //permite que se use global
      load: [typeorm], //hace que se cargue el archivo typeorm
    }),
    TypeOrmModule.forRootAsync({
      //permite que typeorm trabaje asincrono
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
