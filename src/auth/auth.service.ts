import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';

// import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginResponse } from './interfaces/login-response';
import { codeErrors } from 'src/params';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  public codeErrors = codeErrors;

  constructor(
    @InjectRepository(User)
    private userModel: Repository<User>,

    private readonly jwtService: JwtService,

  ) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      // 1. Encrypt Password
      const { password, ...userData } = createUserDto;

      const passwordEncrypt = bcrypt.hashSync( password, 10 );

      const newUser = this.userModel.create({
        password: bcrypt.hashSync( password, 10 ),
        userName: createUserDto.userName,
        ...userData
      });

      // 2. Save user 
      const newUserSaved = await this.userModel.save(newUser);
 
      if (!newUserSaved) {
        throw new InternalServerErrorException('¡Ha ocurrido un error en el servidor!');
      }
      
      const { password:_, ...rest } = newUserSaved;

      const response = {
        user: rest,
      }

      return response;

    }catch (err){
      if(err.errno === codeErrors.duplicatedKey){
        throw new BadRequestException(`Correo ${createUserDto.email} ya existe`);
      }
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
    }
  }
  
  async signIn(loginDto: LoginDto): Promise<LoginResponse> {
    try {
      console.log(loginDto);
      // 1. Validate user credentials
      // 2. Generate JWT token
      // 3. Return JWT token
      // 4. Consultar información del usuario y retornar al front para guardar en storage

      // Se valida login con email o userName
      const { email, password } = loginDto;
      
      let user = await this.userModel.findOne({ 
        where:  { email: email },
      });

      if (!user){
        user = await this.userModel.findOne({ 
          where:  { userName: email }
        });

        if (!user){
          throw new UnauthorizedException('Credenciales invalidas - Usuario no fue encontrado');
        }
      }

      if (!user.isActive){
        throw new UnauthorizedException('Usuario se encuentra inactivo, por favor contactar al administrador del sistema');
      }

      if (!bcrypt.compareSync( password, user.password)){
        throw new UnauthorizedException('Credenciales invalidas - No conincide la contraseña');
      }

      const { password:_, ...restDataUser } = user; 

      const response = {
        user: restDataUser,
        token: this.getJwtToken({
          id: user.id
        })
      }

      return response
    } catch (err) {
      throw new InternalServerErrorException(`¡Ha ocurrido un error en el servidor! ${err}`);
    }
  }

  getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  // async findAll():Promise<User[]> {
  //   const users = await this.userModel.find().exec();
  //   const userWithoutPassword = users.map(user => {
  //     const { password, ...restUser } = user;
  //     return restUser; 
  //   })
  //   return userWithoutPassword;
  // }

  async getUserById(id: number){
    const user = await this.userModel.findOne({
      where: { id: id }
    });
    const { password, ...rest } = user;

    return rest;
  }
}
