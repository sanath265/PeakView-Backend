import { Inject, Injectable } from '@nestjs/common';

import { UpdateReservationDto } from './reservations/dto';
import { ReservationsRepository } from './reservations.repository';
import { CreateReservationDto } from './reservations/dto';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    //here you can directly use the @Inject decorator to inject the ClientProxy instance for the PAYMENTS_SERVICE
    @Inject(PAYMENTS_SERVICE) paymentsService: ClientProxy,
  ) {}


  async create(createReservationDto: CreateReservationDto,userId: string) {
    //now after creating the reservation you want to bill the user for that reservation
    //for this you need to edit the create-reservation dto, to include the card details as well
    
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId,
    });
  }

  async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({_id})
  }
}
