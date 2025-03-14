import {IsArray, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";

export class DeleteTaskDto {
    @IsArray()
    @IsNotEmpty()
    ids: number[];
}
