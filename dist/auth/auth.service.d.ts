import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginResponse } from './interfaces/login-response';
export declare class AuthService {
    private userModel;
    private readonly jwtService;
    codeErrors: {
        duplicatedKey: number;
    };
    constructor(userModel: Repository<User>, jwtService: JwtService);
    createUser(createUserDto: CreateUserDto): Promise<any>;
    signIn(loginDto: LoginDto): Promise<LoginResponse>;
    getJwtToken(payload: JwtPayload): string;
    getUserById(id: number): Promise<{
        id: number;
        tasks: import("../tasks/entities/task.entity").Task[];
        email: string;
        userName: string;
        isActive: boolean;
        createAt: string;
        createTime: string;
        updateAt: string;
        updateTime: string;
    }>;
}
