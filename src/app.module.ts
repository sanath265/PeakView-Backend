import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//as you can see it is @app/common instead of the actual path
//this is like a variable which holds the actual path 
//it is defined in the tsconfig.json file
//so when you change the directory structure you don't need to manually
//change all the paths, but rather just change the variable value in
//tsconfig.json file
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
