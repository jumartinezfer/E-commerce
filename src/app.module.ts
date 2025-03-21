import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import typeorm from './config/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'process'

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
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    OrdesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
