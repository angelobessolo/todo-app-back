import {IsOptional, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
    @MinLength(6, { message: 'El título debe tener al menos 6 caracteres.'})
    @IsString()
    title: string;

    @MinLength(6, { message: 'La descripción debe tener al menos 6 caracteres.'})
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    status: string;
}
