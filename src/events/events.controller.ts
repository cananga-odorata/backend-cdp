import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { EventsService } from './events.service';
// import { Event } from './events.entity';
import { ConfigService } from '@nestjs/config';
import { Client } from '@line/bot-sdk';


@Controller('events')
export class EventsController {
  private readonly client: Client;

  
  constructor(
    private readonly eventsService: EventsService,
    private configService: ConfigService
  ) {
    this.client = new Client({
      channelAccessToken: this.configService.get<string>('LINE_CHANNEL_ACCESS_TOKEN_MESSAGE_API'),
      channelSecret: this.configService.get<string>('LINE_CHANNEL_SECRET_MESSAGE_API'),
    });
    
  }

  @Get('all')
  async findAll() {
    return this.eventsService.findAll();
  }

  // @Get('analytics')
  // async getAnalyticsData() {
  //   return this.eventsService.getEventData();
  // }

  @Post('webhook')
  async handleWebhook(@Req() req, @Res() res) {
    const events = req.body.events;
    console.log('App Controller work')
    console.log(req.body.events)

    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {

        await this.eventsService.createEvent({
          user_id: event.source.userId,
          type: event.type,
          message: event.message,
          timestamp: event.timestamp,
        })

        await this.client.replyMessage(event.replyToken, {
          type: 'text',
          text: `You said: ${event.message.text}`,
        });
      }
    }

    res.status(200).send('OK');
  }

  @Post()
  async create(@Body() eventData: Partial<Event>) {
    return this.eventsService.createEvent(eventData);
  }
}
