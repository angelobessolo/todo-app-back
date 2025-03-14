import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { DeleteTaskDto } from './dto/delete-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    createTask(res: Response, req: Request, createTaskDto: CreateTaskDto): Promise<Response<any, Record<string, any>>>;
    updateTask(res: Response, req: Request, id: number, updateTaskDto: UpdateTaskDto): Promise<Response<any, Record<string, any>>>;
    getAllTasksByUser(res: Response, req: Request, id: number): Promise<Response<any, Record<string, any>>>;
    deleteTaks(res: Response, req: Request, deleteTaskDto: DeleteTaskDto): Promise<Response<any, Record<string, any>>>;
}
