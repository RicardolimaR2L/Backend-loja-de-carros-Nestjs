import { Controller, HttpCode, HttpStatus, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class Authcontroller {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)//Retorna o status como OK(funcionou).
    login(@Body() dto: LoginDto) {//@Body captura os dados do corpo da requisição e passa para o loginDto
        return this.authService.Login(dto);
    }


}