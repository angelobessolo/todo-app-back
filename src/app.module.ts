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
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'smart-talent_db',
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
