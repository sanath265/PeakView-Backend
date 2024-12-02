import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from './dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  //clients like the one below always use private readonly
  //also  in order to actually access an env variable, you can do ::  this.configService.get('STRIPE_SECRET_KEY')  (remember this as well)
  private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'),{
    apiVersion:'2024-10-28.acacia',
  });
  

  //always remember that in order to access the env variables inside another service
  //you will need to inject the ConfigService like below inside the constructor (using private readonly )
  constructor(private readonly configService: ConfigService){

  }



  //this was initially how the inputs to the method createCharge looked:
  //createCharge(card: Stripe.PaymentMethodCreateParams.Card, amount: number)
  //but then i changed the inputs so that it directly takes from the dto itself
  //(you should do this after creating the dto)
  //remember the syntax for doing this i.e.::  {card,amount}: CreateChargeDto



  async createCharge({card,amount}: CreateChargeDto){
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card 

    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      //by default smallest unit of currency (i.e. cent) is considered in the stripe API
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });

    return paymentIntent; 
  }
  
  
}
