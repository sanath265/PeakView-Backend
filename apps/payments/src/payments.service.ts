import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  //clients like the one below always use private readonly
  //also  in order to actually access an env variable, you can do ::  this.configService.get('STRIPE_SECRET_KEY')  (remember this as well)
  private readonly = new Stripe(this.configService.get('STRIPE_SECRET_KEY'),{
    apiVersion:'2024-10-28.acacia',
  });
  

  //always remember that in order to access the env variables inside another service
  //you will need to inject the ConfigService like below inside the constructor (using private readonly )
  constructor(private readonly configService: ConfigService){

  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
