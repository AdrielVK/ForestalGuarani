import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { DatabaseModule } from './database/database.module';
import { BussinessModule } from './bussiness/bussiness.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    ApplicationModule,
    DatabaseModule,
    BussinessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
