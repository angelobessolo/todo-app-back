import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
 
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'smart-talent_db',
      // entities: [ 
      //   join(__dirname, '**', '*.entity.{ts,js}')
      // ], 
      // synchronize: true,
      // logging: false,   
      type: 'mysql',
      host: process.env.DB_HOST || 'db',  // Cambiado a 'db' (nombre del servicio en docker-compose.yml)
      port: parseInt(process.env.DB_PORT, 10) || 3306, // Usamos el puerto configurado en docker-compose
      username: process.env.DB_USERNAME || 'root', 
      password: process.env.DB_PASSWORD || 'root',  // El password debe coincidir con el definido en docker-compose
      database: process.env.DB_DATABASE || 'smart_talent_db',
      entities: [
        join(__dirname, '**', '*.entity.{ts,js}')
      ], 
      synchronize: true,
      logging: false,
    }),   
    AuthModule, 
    TasksModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
