import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './reservations/models/reservation.schema';
import { LoggerModule } from '@app/common/logger';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';


@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    //always configure the configModule for that microservice within the module folder itself
    ConfigModule.forRoot({
      //put isGlobal as true so that the configModule is available everywhere within this service
      isGlobal: true,
      envFilePath: './apps/reservations/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required()
      })
    }),

    
    //a list exists to register many different client proxy configurations
    //ClientsModule.register([
    //  {name: AUTH_SERVICE,transport: Transport.TCP}
    //])
    //now the above code is fine, but for example if we want to get env variables within this method
    //we have to use registerAsync method instead, because it takes some time for the config service to get the env variables
    //(basically it will allow us to use a useFactory method, in order to actually use configService methods, (check nestjs docs for info on useFactory))
    //here we have to get the TCP PORT therefore we need to access the config service methods
    //use factory allows us to directly inject various modules inside methods itself and access methods from those injected modules directly
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            //now make sure to create the AUTH_HOST env variable
            //this will basically tell this configuration of ClientProxy (which is used by the reservations service to communicate with the auth service)
            //where to communicate to, now when in containers, each container can talk to other container using their serivce names itself
            //therefore the value of AUTH_HOST should be 'auth' because the name of the auth microservice is 'auth' in the docker compose file
            //(remember host is just like an independant entity that has several ports, it can be localhost, etc)
            //AUTH_PORT   obv has to be the TCP port (3002) on which that specific route (in auth controller) is listening to in order to handle requests from reservations microservice
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT')

          }
        }),
        //make sure to also inject into the registerAsync method whatever module u are using inside it, using the inject option
        inject: [ConfigService]

      }
    ])
    
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
