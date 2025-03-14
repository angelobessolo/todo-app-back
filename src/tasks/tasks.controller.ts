import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/Auth.guard';
import { Response } from 'express';
import { Task } from './entities/task.entity';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Metodo para crear tarea
  @UseGuards( AuthGuard )
  @Post()
  @ApiResponse({status: 201, description: 'Tarea fue creada exitosamente', type: Task})
  async createTask(@Res() res: Response, @Req() req: Request, @Body() createTaskDto: CreateTaskDto) {
    try {
      const user = req['user'];
      const data = await this.tasksService.createTask(createTaskDto, user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Usuario fue creado exitosamente',
        data
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de crear tarea',
        error: error.message,
      });
    }
  } 

  // Metodo para actualizar tarea por id
  @UseGuards( AuthGuard )
  @Patch('/:id')
  async updateTask(@Res() res: Response, @Req() req: Request, @Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const user = req['user'];
      const tasks = await this.tasksService.updateTask(+id, updateTaskDto, user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con exito',
        data: {
          tasks: tasks,
        } 
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    } 
  }

  // Metodo para obtener tareas por usuario
  @UseGuards( AuthGuard )
  @Get('/tasks-by-user-id/:id')
  async getAllTasksByUser(@Res() res: Response, @Req() req: Request, @Param('id') id: number) {
    try {
      const user = req['user'];
      const tasks = await this.tasksService.getAllTasksByUser(+id, user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con exito',
        data: {
          tasks: tasks,
        } 
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    } 
  }

  // Metodo para eliminar tareas
  @UseGuards( AuthGuard )
  @Delete()
  async deleteTaks(@Res() res: Response, @Req() req: Request, @Body() deleteTaskDto: DeleteTaskDto) {
    try {
      const user = req['user'];
      const tasks = await this.tasksService.deleteTasks(deleteTaskDto, user);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Petición realizada con exito',
        data: {
          tasks: tasks,
        } 
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de retornar la busqueda',
        error: error.message,
      });
    } 
  }
}
