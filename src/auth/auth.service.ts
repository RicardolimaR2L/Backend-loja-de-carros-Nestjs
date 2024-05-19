import { BadRequestException, Injectable, } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { MessagesHelper } from './helpers/message.helper';


@Injectable()
export class AuthService {


    Login(dto:LoginDto){

        if(dto.login !== "teste@teste.com" || dto.password!== "teste@123"){
            throw new BadRequestException(MessagesHelper.AUTH_LOGIN_NOT_FOUND)

        }
        return dto;
    }
    // private logger = new Logger(AuthService.name);

    // constructor(
    //     private readonly userService: UserService,
    //     private readonly jwtService: JwtService
    // ) {}

    // async login(dto: LoginDto) {
    //     this.logger.debug('login - started'); // Imprime no console da aplicação que o login foi iniciado 

    //     const user = await this.userService.getUserByLogin(dto.login, dto.password);
    //     if (user == null) {
    //         throw new BadRequestException(MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND);
    //     }
    //     const tokenPayload = { email: user.email, sub: user._id }; // Payload com as informações do token

    //     return {
    //         email: user.email,
    //         name: user.name,
    //         token: this.jwtService.sign(tokenPayload, { secret: process.env.USER_JWT_SECRET_KEY })
    //     };
    // }
}
