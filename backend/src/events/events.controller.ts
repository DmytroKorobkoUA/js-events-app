import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    async getEvents(
        @Query('city') city: string = 'London',
        @Query('date') date: string = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
        @Query('eventType') eventType: string = ''
    ) {
        try {
            return await this.eventsService.getEvents(city, date, eventType);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('filters')
    async getEventTypes() {
        try {
            const eventTypes = await this.eventsService.getEventTypes();
            return { eventTypes };
        } catch (error) {
            throw error;
        }
    }
}
