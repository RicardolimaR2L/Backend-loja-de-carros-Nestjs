import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'//importa a strategy

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {

    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ingnoreExpiration:true,//Ignora o tempo de validade do token  
            secretOrKey: process.env.USER_JWT_SECRET_KEY//Uso da env que armazena a chave JWt
        });
    }
        async validate(payload:any) {
            return { userId: payload.sub, email: payload.email }; //id e email vindo do payload
        }

} 