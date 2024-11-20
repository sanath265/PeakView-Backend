import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule } from '@nestjs/config';


//remember to orrect this joi import, automatic import is import Joi from joi
//but the import we want is below
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';
 

@Module({
  imports: [ConfigModule.forRoot({
    //put isGlobal as true so that the configModule is available everywhere within this service
    isGlobal: true,
    envFilePath: './apps/auth/.env',
    validationSchema: Joi.object({

      //the below code is used for verifying verifying whether all .env variables exist or not
      //therefore you always have to come back here and make changes whenever you add a new .env variable
      PORT: Joi.number().required()
    })
  }),
LoggerModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
