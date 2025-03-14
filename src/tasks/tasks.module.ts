import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      User,
      Task
    ]),
    // Circular dependencies injection
    forwardRef(() => AuthModule), 
  ],
  exports: [
    // Export services
    TasksService,

    // Export entities
    TypeOrmModule
  ], 
})
export class TasksModule {}
