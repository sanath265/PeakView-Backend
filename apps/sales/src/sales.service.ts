
import { Inject, Injectable } from '@nestjs/common';
import { UpdateSalesDto } from './sales/dto';
import { SalesRepository } from './sales.repository';
import { CreateSalesDto } from './sales/dto';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';







@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepository: SalesRepository,
    //here you can directly use the @Inject decorator to inject the ClientProxy instance for the PAYMENTS_SERVICE
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}


  async create(createSalesDto: CreateSalesDto,{email, _id: userId}: UserDto) {
    //now after creating the reservation you want to bill the user for that reservation
    //for this you need to edit the create-reservation dto, to include the card details as well
    
    //here the reservations microservice has to first communicate with the payments microservice before returning the createReservationDto object
    //to the user that called the route, remember this method/syntax of communication (i.e. use the send() method and also the create_charge message pattern)
    //second parameter is the data to send, it will obv be the charge object (which is a nested dto inside the createReservationDto, as we did it like that)

    //the below line returns an observable and not a promise, so we will remove the await keyword
    //and then we can subscribe to it by using the below syntax

    // this.paymentsService.send('create_charge',createReservationDto.charge).subscribe(async (response) => {
    //   //after you send the charge off to the payments microservice you can actually go ahead and create the reservation, therefore make sure there is async (like above)

      

    //   return this.reservationsRepository.create({
    //     ...createReservationDto,
    //     timestamp: new Date(),
    //     userId,
    //   });
    // })

    //here actually instead of subscribe, we can use the pipe operator to directly send the response to the frontend
    //nestjs will automatically subscribe to the observable (here we have to first transform the response using the map operator)

    return this.paymentsService.send('create_charge',{
      ...createSalesDto.charge,
      email
    }).pipe(
      map((res) => {
        console.log(res)
      
      return this.salesRepository.create({
        ...createSalesDto,
        //like this instead of the invoiceId being user given, i am taking it from the stripe transaction, make sure to remember this
        invoiceId: res.id,
        timestamp: new Date(),
        userId,
      });
    }))
    
  }

  async findAll() {
    return this.salesRepository.find({});
  }

  async findOne(_id: string) {
    return this.salesRepository.findOne({ _id });
  }

  async update(_id: string, updateSalesDto: UpdateSalesDto) {
    return this.salesRepository.findOneAndUpdate(
      { _id },
      { $set: updateSalesDto },
    );
  }

  async remove(_id: string) {
    return this.salesRepository.findOneAndDelete({_id})
  }
}