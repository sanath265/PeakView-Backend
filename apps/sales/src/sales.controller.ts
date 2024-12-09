import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSalesDto, UpdateSalesDto } from './sales/dto'
//@app/common is just a short form for the libs/common folder where all of our common code is located
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';


















//when you make a request and it succeeds, but after sometime the same request fails
//it maybe that the jwt token has expired, in that case, you will have to login again to recieve a new jwt token








@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}


  //make sure not to miss the async and await keywords where ever required
  //as you can observe below, we can pass in multiple decorators directly into the arguments of any method
  //here a method of a controller route, this allows us to get access to the stuff that we want in a very clean manner
  //like the user object of the current request for example
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSalesDto: CreateSalesDto, @CurrentUser() user: UserDto ) {
    //the user type didnt exist, so i made a dto for it called the UserDto, remember this method for creating new types
    const _user =  await this.salesService.create(createSalesDto,user);
    console.log(user)
    return _user;
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.salesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSalesDto: UpdateSalesDto,
  ) {
    return this.salesService.update(id, updateSalesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}




//on first applying the authGuard, you will get this error:
//ERROR [ExceptionHandler] Nest can't resolve dependencies of the JwtAuthGuard (?). 
//Please make sure that the argument "auth" at index [0] is available in the ReservationsModule context.
//reservations-1 
//this happens because you havemt provided the AUTH_SERVICE injection token  (from the jwt-auth.guard.ts file in the libs/common) in the reservations service
//where we are trying to use it
//therefore you have to register this service and provide the injection token (check the reservations module for how it is implemented)