import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/Auth.guard';
import { JwtPayload } from './interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './interfaces/login-response';
import {Response } from 'express';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // Metodo para crear usuario
  // @UseGuards( AuthGuard )
  @Post()
  @ApiResponse({status: 201, description: 'Usuario fue creado exitosamente', type: User})
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.authService.createUser(createUserDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Usuario fue creado exitosamente',
        data
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al momento de crear usuario',
        error: error.message,
      });
    }
  }

  @Post('/signIn')
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  // @UseGuards( AuthGuard )
  // @Get()
  // findAll( @Request() req: Request ) {
  //   const user = req['user'];
  //   return user
  //   // return this.authService.findAll();
  // }

  // @UseGuards( AuthGuard )
  // @Get('/check-token')
  // CheckToken(@Request() req: Request): LoginResponse {

  //   console.log(req);
  //   const user = req['user'] as User;
  //   const userParams = req['userParams'];
  //   console.log(req);
  //   return {
  //     user,
  //     userParams,
  //     token: this.authService.getJwtToken({id: user._id})
  //   } 
  // }

  // @UseGuards( AuthGuard )
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @UseGuards( AuthGuard )
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @UseGuards( AuthGuard )
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
