import { NestFactory } from '@nestjs/core';
import { SalesModule } from './sales.module';

async function bootstrap() {
  const app = await NestFactory.create(SalesModule);
  await app.listen(3000);
}
bootstrap();










//Inventory APIs:
//post a product (multiple products might be in a single body)
//get all products


//Sales APIs
//GET Api of the products table (get all the records in it)
//POST APi request (go through each product quantity and quantites to each product, then return the same request body with the id of the order ofc)


//fix the cors issue
//create sales and inventory services
//change schema in auth: include firstName, lastName, phoneNumber, Gender (check in notes)