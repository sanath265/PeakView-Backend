import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

//logger module is the module inside nestjs pino
//even if you have imported something in another file
//you have to specify it here in the main module file
//so that nestjs knows about it

//To use the JwtModule.registerAsync() method in NestJS, you can configure
//your JWT module asynchronously, which is useful when you need to retrieve dynamic
//configuration settings like secrets from a configuration service or an environment variable.

//when you change stuff in .env files you will have to restart the containers
//as nest watch does not hot reload changes from .env files

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    ConfigModule.forRoot({
      //put isGlobal as true so that the configModule is available everywhere within this service
      isGlobal: true,
      envFilePath:'../.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
