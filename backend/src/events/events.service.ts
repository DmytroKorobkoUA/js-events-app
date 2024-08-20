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

    async getEvents(city: string, date: string, eventType: string): Promise<Event[]> {
        const queryConditions = { city, date } as any;
        if (eventType) queryConditions.eventType = eventType;

        const cachedDbEvents = await this.eventRepository.find({
            where: queryConditions,
            take: 20,
            order: { date: 'DESC' },
        });

        if (cachedDbEvents.length > 0) {
            return cachedDbEvents;
        }

        const formattedDate = `${date}T00:00:00Z`;
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?city=${encodeURIComponent(city || 'London')}&classificationName=${encodeURIComponent(eventType || '')}&startDateTime=${encodeURIComponent(formattedDate)}&apikey=${this.apiKey}`;

        try {
            const response = await lastValueFrom(
                this.httpService.get(url).pipe(map(response => response.data))
            );

            if (response._embedded?.events?.length === 0) {
                throw new Error(`No events found for city ${city}. Please check if the city name is correct.`);
            }

            const eventsData = response._embedded?.events || [];

            const eventsToSave = eventsData.map((eventData: any) => {
                const event = new Event();
                event.eventId = eventData.id;
                event.name = eventData.name;
                event.city = city;
                event.date = date;
                event.eventType = eventType || '';
                event.description = eventData.info || '';
                event.venue = eventData._embedded?.venues[0]?.name || '';
                event.url = eventData.url || '';
                event.imageUrl = eventData.images[0]?.url || '';
                event.priceRange = eventData.priceRanges?.map((price: any) => price.type + ': ' + price.currency + price.min + '-' + price.max).join(', ') || '';
                event.audience = eventData._embedded?.attractions?.map((attr: any) => attr.name).join(', ') || '';

                return event;
            });

            await this.eventRepository.save(eventsToSave);

            return eventsToSave;
        } catch (error) {
            if (error.response?.status === 404) {
                throw new Error(`City "${city}" not found. Please verify the city name.`);
            }
            throw error;
        }
    }

    async getEventTypes(): Promise<string[]> {
        const eventTypeUrl = `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${this.apiKey}`;

        try {
            const eventTypesResponse = await lastValueFrom(
                this.httpService.get(eventTypeUrl).pipe(map(response => response.data))
            );

            const eventTypes: string[] = eventTypesResponse._embedded?.classifications
                .map((type: any) => type.segment?.name)
                .filter((name: string | undefined | null) => name !== undefined && name !== null && name.trim() !== '') || [];

            return eventTypes;
        } catch (error) {
            throw error;
        }
    }

}
