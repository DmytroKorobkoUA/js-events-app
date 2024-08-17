import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    async getEvents(@Query('city') city: string, @Query('date') date: string) {
        return await this.eventsService.getEvents(city, date);
    }
}
