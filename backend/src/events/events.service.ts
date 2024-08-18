import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from './event.entity';

@Injectable()
export class EventsService {
    private readonly apiKey: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
    ) {
        this.apiKey = this.configService.get<string>('API_KEY');
    }

    async getEvents(city: string, date: string): Promise<Event[]> {
        const cachedEvents = await this.eventRepository.find({
            where: { city, date },
        });

        if (cachedEvents.length > 0) {
            return cachedEvents;
        }

        const formattedDate = `${date}T00:00:00Z`;
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&startDateTime=${formattedDate}&apikey=${this.apiKey}`;

        try {
            const response = await lastValueFrom(
                this.httpService.get(url).pipe(map(response => response.data))
            );

            const eventsData = response._embedded?.events || [];

            const eventsToSave = eventsData.map((eventData: any) => {
                const event = new Event();
                event.eventId = eventData.id;
                event.name = eventData.name;
                event.city = city;
                event.date = date;
                return event;
            });

            await this.eventRepository.save(eventsToSave);

            return eventsToSave;
        } catch (error) {
            throw error;
        }
    }
}
