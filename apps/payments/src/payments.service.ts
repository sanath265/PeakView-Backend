import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly = new Stripe();
  getHello(): string {
    return 'Hello World!';
  }
}
