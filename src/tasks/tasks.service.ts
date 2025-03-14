import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { codeErrors } from 'src/params';
import { User } from 'src/auth/entities/user.entity';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskModel: Repository<Task>,

    @InjectRepository(User)
    private userModel: Repository<User>,
  ){}

    // Metodo para crear tarea
  async createTask(createTaskDto: CreateTaskDto, userRequest: User): Promise<Task> {
    try {
      // Buscar al usuario en la base de datos usando su ID
      const user = await this.userModel.findOne({ where: { id: userRequest.id } });

      // Si no se encuentra el usuario, lanzar una excepción
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      const newTask = this.taskModel.create({
        ...createTaskDto,
        user, 
      });

      const newUserSaved = await this.taskModel.save(newTask);
  
      if (!newUserSaved) {
        throw new InternalServerErrorException('¡Ha ocurrido un error en el servidor!');
      }
      
      return newUserSaved;

    }catch (err){
      if(err.errno === codeErrors.duplicatedKey){
        throw new BadRequestException(`Correo ${createTaskDto.title} ya existe`);
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
    }
  }

  // Metodo para obtener tareas por usuario
  async getAllTasksByUser(id: number, user: User): Promise<Task[]>{
    try {
      const tasks = await this.taskModel.find({
        where: { 
          user: {id}, 
        },
        relations: ['user'],
      });

      if (!tasks){
        throw new NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
      }
      return tasks;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Si es NotFoundException, vuelve a lanzarla
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }

  // Metodo para obtener tareas por usuario
  async updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    try {
      const task = await this.taskModel.findOne({
        where: { id, user: { id: user.id } }, // Asegura que la tarea pertenezca al usuario
        relations: ['user'],
      });
  
      if (!task) {
        throw new NotFoundException('¡No se encontró la tarea en la base de datos!');
      }
  
      // Actualizar los campos de la tarea con los valores de updateTaskDto
      Object.assign(task, updateTaskDto);
  
      // Guardar la tarea actualizada
      return await this.taskModel.save(task);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }

  // Metodo para eliminar array de tareas  
  async deleteTasks(deleteTaskDto: DeleteTaskDto, user: User): Promise<any> {
    try {
      const { ids } = deleteTaskDto;

      const result = await this.taskModel.delete({ id: In(ids) });

      if (result.affected === 0) {
        throw new NotFoundException('Tareas no encontradas');
      }

      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
    }
  }
  
}
