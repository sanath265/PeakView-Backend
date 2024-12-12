import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CardDto{

    //in stripe handling raw card data is no longer allowed due to PCI backend compliance
    //therefore the backend should only handle the stripe token alone
    //in the tutorial the instructor handles raw card data, like the below commented code
    //this is now changed and no longer allowed therefore, I simply use a token (which is generated by the frontend using the actual card details)


    // @IsString()
    // @IsNotEmpty()
    // cvc: string;

    // @IsNumber()
    // exp_month: number;

    // @IsNumber()
    // exp_year: number;

    // @IsCreditCard()
    // number: string;


    @IsString()
    @IsNotEmpty()
    token: string; // Tokenized card data from Stripe.js or Elements


}