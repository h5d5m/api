import { Logger, Module } from '@nestjs/common';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, ConnectionSchema } from './schemas/connection.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Connection.name, schema: ConnectionSchema},
      {name: User.name, schema: UserSchema}
    ]),
    UserModule
  ],
  controllers: [ConnectionController],
  providers: [ConnectionService, Logger]
})
export class ConnectionModule {}
