import { Task } from "src/tasks/entities/task.entity";
export declare class User {
    id: number;
    tasks: Task[];
    email: string;
    password?: string;
    userName: string;
    isActive: boolean;
    createAt: string;
    createTime: string;
    updateAt: string;
    updateTime: string;
}
