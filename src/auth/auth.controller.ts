import { Controller, HttpCode, HttpStatus, Post, Body, Put, Param, Req, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterUserDto } from "src/user/dto/register.dto";
import { UserService } from '../user/user.service';

@Controller("auth")
export class Authcontroller {
    constructor(
        private readonly authService: AuthService){}


    @Post('login')
    @HttpCode(HttpStatus.OK)//Retorna o status como OK(funcionou).
    login(@Body() dto: LoginDto) {//@Body captura os dados do corpo da requisição e passa para o loginDto
        return this.authService.login(dto);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    register(@Body() dto: RegisterUserDto) {
        return this.authService.RegisterUser(dto);
    }   
}