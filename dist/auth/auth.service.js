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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const params_1 = require("../params");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.codeErrors = params_1.codeErrors;
    }
    async createUser(createUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            const passwordEncrypt = bcrypt.hashSync(password, 10);
            const newUser = this.userModel.create({
                password: bcrypt.hashSync(password, 10),
                userName: createUserDto.userName,
                ...userData
            });
            const newUserSaved = await this.userModel.save(newUser);
            if (!newUserSaved) {
                throw new common_1.InternalServerErrorException('¡Ha ocurrido un error en el servidor!');
            }
            const { password: _, ...rest } = newUserSaved;
            const response = {
                user: rest,
            };
            return response;
        }
        catch (err) {
            if (err.errno === params_1.codeErrors.duplicatedKey) {
                throw new common_1.BadRequestException(`Correo ${createUserDto.email} ya existe`);
            }
            throw new common_1.InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
        }
    }
    async signIn(loginDto) {
        try {
            console.log(loginDto);
            const { email, password } = loginDto;
            let user = await this.userModel.findOne({
                where: { email: email },
            });
            if (!user) {
                user = await this.userModel.findOne({
                    where: { userName: email }
                });
                if (!user) {
                    throw new common_1.UnauthorizedException('Credenciales invalidas - Usuario no fue encontrado');
                }
            }
            if (!user.isActive) {
                throw new common_1.UnauthorizedException('Usuario se encuentra inactivo, por favor contactar al administrador del sistema');
            }
            if (!bcrypt.compareSync(password, user.password)) {
                throw new common_1.UnauthorizedException('Credenciales invalidas - No conincide la contraseña');
            }
            const { password: _, ...restDataUser } = user;
            const response = {
                user: restDataUser,
                token: this.getJwtToken({
                    id: user.id
                })
            };
            return response;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
        }
    }
    getJwtToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
    async getUserById(id) {
        const user = await this.userModel.findOne({
            where: { id: id }
        });
        const { password, ...rest } = user;
        return rest;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map