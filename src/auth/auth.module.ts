import { Module } from "@nestjs/common";
import { Authcontroller } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [],
    controllers: [Authcontroller],
    providers: [AuthService],
})
export class AuthModule {

}