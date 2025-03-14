import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TasksModule } from 'src/tasks/tasks.module';
  
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      User
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
 
    // Circular dependencies injection
    forwardRef(() => TasksModule), 
  ],
  exports: [
    // Export services
    AuthService,

    // Export entities
    TypeOrmModule
  ], 
}) 
export class AuthModule {}
 