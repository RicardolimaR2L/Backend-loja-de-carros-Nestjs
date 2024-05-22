import { Module } from "@nestjs/common";
import { Authcontroller } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtStartegy } from "./strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [UserModule,
        JwtModule.register({
            secret: process.env.USER_JWT_SECRET_KEY
        })
    ],
    controllers: [Authcontroller],
    providers: [AuthService, JwtStartegy],
})
export class AuthModule {

}