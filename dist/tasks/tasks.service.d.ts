import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { DeleteTaskDto } from './dto/delete-task.dto';
export declare class TasksService {
    private taskModel;
    private userModel;
    constructor(taskModel: Repository<Task>, userModel: Repository<User>);
    createTask(createTaskDto: CreateTaskDto, userRequest: User): Promise<Task>;
    getAllTasksByUser(id: number, user: User): Promise<Task[]>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
    deleteTasks(deleteTaskDto: DeleteTaskDto, user: User): Promise<any>;
}
