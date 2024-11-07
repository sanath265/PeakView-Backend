import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { UsersRepository } from './users.repository';


@Module({
  imports: [DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  //make sure to specify the exports clearly, i.e. stuff from this module which will be used as injectables in other places
  //otherwise this can lead to intermittent errors, where packages that use them as injectables cant recognise them,. because
  //they weren't exported from here
  exports: [UsersService]
})
export class UsersModule {}
