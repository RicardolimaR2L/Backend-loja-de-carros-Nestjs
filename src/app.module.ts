import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CarsModule } from './cars/cars.module';
@Module({
  imports: [UserModule, CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
