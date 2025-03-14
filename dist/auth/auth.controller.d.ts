import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './interfaces/login-response';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    create(res: Response, createUserDto: CreateUserDto): Promise<Response<any, Record<string, any>>>;
    login(loginDto: LoginDto): Promise<LoginResponse>;
    getJwtToken(payload: JwtPayload): string;
}
