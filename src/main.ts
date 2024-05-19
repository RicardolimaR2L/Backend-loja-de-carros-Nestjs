import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn']

  });
  app.enableCors();
  //app.enableCors({origin:'loja-de-carros-web.vercel.app'});
  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      whitelist:true,//converte só o que esta mapeado no Dto
      forbidNonWhitelisted:false//Ignora erros caso chegue algum dado nao esperado no payload
    })
  );
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
