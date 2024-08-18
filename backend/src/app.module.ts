import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { User } from './users/user.entity';
import { Event } from './events/event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}`,
        `.env`,
      ],
      isGlobal: true,
    }),
    HttpModule,
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Event],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Event]),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
