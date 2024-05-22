import { BadRequestException, Injectable, Logger, } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { MessagesHelper } from './helpers/message.helper';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from 'src/user/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UserMessagehelper } from 'src/user/helpers/message.helpers';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }
    private logger = new Logger(AuthService.name)//instancia dos loggs


    async login(dto: LoginDto) {
        this.logger.debug('login - started');
        const user = await this.userService.getUserByLoginPassword(dto.login, dto.password)
        if (user == null) {
            throw new BadRequestException(MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND);
        }
        const tokenPayload = { email: user.email, sub: user._id };//dados do usuário
        return {
            email: user.email,
            name: user.name,
            token: this.jwtService.sign(tokenPayload, { secret: process.env.USER_JWT_SECRET_KEY })
        }
    }
    
    async RegisterUser(dto: RegisterUserDto) {
        this.logger.debug('register - started');
        if (await this.userService.existsByEmail(dto.email)) {//Verifica se já existe um email cadastrado no sistema, e retorna o erro. 
            {
                throw new BadRequestException(UserMessagehelper.REGISTER_EXIST_EMAIL_ACCOUNT)
            }
        }
        await this.userService.createUser(dto);
    }
}

