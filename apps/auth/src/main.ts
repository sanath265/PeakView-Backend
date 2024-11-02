import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino/Logger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  console.log('testingwSdui   hello');
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  //instantiating the config service like this, allows you to
  //retrieve any injectable
  const configService = app.get(ConfigService);
  //await app.listen(configService.get('PORT'));
  await app.listen(3001);
}
bootstrap();
