import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from '../helpers/message.helper';

export class LoginDto {

    @IsEmail({}, { message: MessagesHelper.AUTH_LOGIN_NOT_FOUND })
    login: string;

    @IsNotEmpty({message: MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND})
    password: string;
    
} 