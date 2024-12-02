//remember how i made wrote dto code
//first create a dto folder inside the src folder of the microservice
//then create the file in the name format: dto-name.dto.ts
//see how i am constructing the dto, it should have as properties the input of the corresponding service function which handles this particular payload
//that is why i copied the arguments from that particular createCharge method and pasted them as properties under this class
//class names should always start with capital letters and continue in camel case

import Stripe from "stripe"

export class CreateChargeDto {
    card: Stripe.PaymentMethodCreateParams.Card;
    amount: number

}