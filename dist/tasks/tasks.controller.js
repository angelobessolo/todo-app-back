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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const swagger_1 = require("@nestjs/swagger");
const Auth_guard_1 = require("../auth/guards/Auth.guard");
const task_entity_1 = require("./entities/task.entity");
const delete_task_dto_1 = require("./dto/delete-task.dto");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async createTask(res, req, createTaskDto) {
        try {
            const user = req['user'];
            const data = await this.tasksService.createTask(createTaskDto, user);
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                message: 'Usuario fue creado exitosamente',
                data
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error al momento de crear tarea',
                error: error.message,
            });
        }
    }
    async updateTask(res, req, id, updateTaskDto) {
        try {
            const user = req['user'];
            const tasks = await this.tasksService.updateTask(+id, updateTaskDto, user);
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                message: 'Petición realizada con exito',
                data: {
                    tasks: tasks,
                }
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error al momento de retornar la busqueda',
                error: error.message,
            });
        }
    }
    async getAllTasksByUser(res, req, id) {
        try {
            const user = req['user'];
            const tasks = await this.tasksService.getAllTasksByUser(+id, user);
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                message: 'Petición realizada con exito',
                data: {
                    tasks: tasks,
                }
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error al momento de retornar la busqueda',
                error: error.message,
            });
        }
    }
    async deleteTaks(res, req, deleteTaskDto) {
        try {
            const user = req['user'];
            const tasks = await this.tasksService.deleteTasks(deleteTaskDto, user);
            return res.status(common_1.HttpStatus.OK).json({
                statusCode: common_1.HttpStatus.OK,
                message: 'Petición realizada con exito',
                data: {
                    tasks: tasks,
                }
            });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error al momento de retornar la busqueda',
                error: error.message,
            });
        }
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tarea fue creada exitosamente', type: task_entity_1.Task }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request, Number, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, common_1.Get)('/tasks-by-user-id/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request, Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAllTasksByUser", null);
__decorate([
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request, delete_task_dto_1.DeleteTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTaks", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map