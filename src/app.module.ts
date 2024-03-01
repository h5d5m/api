import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConnectionModule } from './connection/connection.module';

@Module({
  imports: [UserModule,
    ConnectionModule,
    AuthenticationModule,
    AuthorizationModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
