import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Event])
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
