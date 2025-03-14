"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_entity_1 = require("./entities/task.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const params_1 = require("../params");
const user_entity_1 = require("../auth/entities/user.entity");
let TasksService = class TasksService {
    constructor(taskModel, userModel) {
        this.taskModel = taskModel;
        this.userModel = userModel;
    }
    async createTask(createTaskDto, userRequest) {
        try {
            const user = await this.userModel.findOne({ where: { id: userRequest.id } });
            if (!user) {
                throw new common_1.BadRequestException('Usuario no encontrado');
            }
            const newTask = this.taskModel.create({
                ...createTaskDto,
                user,
            });
            const newUserSaved = await this.taskModel.save(newTask);
            if (!newUserSaved) {
                throw new common_1.InternalServerErrorException('¡Ha ocurrido un error en el servidor!');
            }
            return newUserSaved;
        }
        catch (err) {
            if (err.errno === params_1.codeErrors.duplicatedKey) {
                throw new common_1.BadRequestException(`Correo ${createTaskDto.title} ya existe`);
            }
            throw new common_1.InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
        }
    }
    async getAllTasksByUser(id, user) {
        try {
            const tasks = await this.taskModel.find({
                where: {
                    user: { id },
                },
                relations: ['user'],
            });
            if (!tasks) {
                throw new common_1.NotFoundException('¡No se encontró coincidencia con el registro en la base de datos!');
            }
            return tasks;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
        }
    }
    async updateTask(id, updateTaskDto, user) {
        try {
            const task = await this.taskModel.findOne({
                where: { id, user: { id: user.id } },
                relations: ['user'],
            });
            if (!task) {
                throw new common_1.NotFoundException('¡No se encontró la tarea en la base de datos!');
            }
            Object.assign(task, updateTaskDto);
            return await this.taskModel.save(task);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
        }
    }
    async deleteTasks(deleteTaskDto, user) {
        try {
            const { ids } = deleteTaskDto;
            const result = await this.taskModel.delete({ id: (0, typeorm_1.In)(ids) });
            if (result.affected === 0) {
                throw new common_1.NotFoundException('Tareas no encontradas');
            }
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${error.message}`);
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map