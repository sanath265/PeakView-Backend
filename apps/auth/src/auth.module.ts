import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';

//logger module is the module inside nestjs pino
//even if you have imported something in another file
//you have to specify it here in the main module file
//so that nestjs knows about it


@Module({
  imports: [UsersModule,LoggerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
