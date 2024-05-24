import { MinLength, IsEmail, Matches, MaxLength } from "class-validator";
import { UserMessagehelper } from "../helpers/message.helpers";


export class RegisterUserDto {
    @MinLength(2, { message: UserMessagehelper.REGISTER_NAME_NOT_VALID })
    name: string;

    @IsEmail({}, { message: UserMessagehelper.REGISTER_EMAIL_NOT_VALID })
    email: string;

    @MinLength(2, { message: UserMessagehelper.REGISTER_STRONG_PASSWORD })
    @MaxLength(20, { message: UserMessagehelper.REGISTER_STRONG_PASSWORD })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {})
    password: string;
}
 