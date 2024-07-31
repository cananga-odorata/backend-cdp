import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './events.entity';
// import { google } from 'googleapis'

@Injectable()
export class EventsService {
  private analytics: any;

  private authClient: any;

  constructor(
    @InjectRepository(Events)
    private eventRepository: Repository<Events>,

  ) {
  //   console.log('GOOGLE_APPLICATION_CREDENTIAL:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
  //   console.log('GOOGLE_ANALYTICS_PROPERTY_ID:', process.env.GOOGLE_ANALYTICS_PROPERTY_ID);

  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: process.env.GOOGLE_APPLICATION_CREDENTIAL,
  //     scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  //   });
  //   this.authClient = auth.getClient();
  //   this.analytics = google.analyticsdata('v1beta');
  
  }


  // async getEventData(): Promise<any> {
  //   const client = await google.auth.getClient();
  //   const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

  //   if (!propertyId || !client) {
  //     throw new Error('Property ID or auth client is missing');
  //   }

  //   const response = await this.analytics.properties.runReport({
  //     property: `properties/${propertyId}`,
  //     requestBody: {
  //       dateRanges: [{ startDate: '2023-07-01', endDate: '2023-07-31' }],
  //       metrics: [{ name: 'eventCount' }],
  //       dimensions: [{ name: 'eventName' }, { name: 'date' }],
  //     },
  //     auth: client,
  //   });
  //   return response.data;
  // }

  async createEvent(event: Partial<Events>): Promise<Events> {
    const newEvent = this.eventRepository.create(event);
    return this.eventRepository.save(newEvent);
  }

  async findAll(): Promise<Events[]> {
    return this.eventRepository.find();
  }
}
