import {IsArray, IsEmail, isNumber, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string;

    @IsString()
    userName: string;
}
