import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventsService {
    private readonly apiKey: string;

    constructor(private readonly httpService: HttpService, private configService: ConfigService) {
        this.apiKey = this.configService.get<string>('API_KEY');
    }

    async getEvents(city: string, date: string): Promise<any> {
        const formattedDate = `${date}T00:00:00Z`;
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&startDateTime=${formattedDate}&apikey=${this.apiKey}`;

        try {
            const response = await lastValueFrom(
                this.httpService.get(url).pipe(map(response => response.data))
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}
