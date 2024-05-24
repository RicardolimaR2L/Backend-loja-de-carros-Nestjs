import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register.dto';
import { MinLength, IsEmail } from "class-validator";
import { UserMessagehelper } from '../helpers/message.helpers';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
    @MinLength(2, { message: UserMessagehelper.REGISTER_NAME_NOT_VALID })
    name: string;
    
    @IsEmail({}, { message: UserMessagehelper.REGISTER_EMAIL_NOT_VALID })
    email: string;
    
}
export default {UpdateUserDto}