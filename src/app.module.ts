import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot(),//configura as envs para serem lidas pelo nestjs
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    CarsModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
