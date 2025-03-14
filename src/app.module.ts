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
      host: process.env.DB_HOST, 
      port: parseInt(process.env.DB_PORT, 10),  
      username: process.env.DB_USERNAME,  
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE, 
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
