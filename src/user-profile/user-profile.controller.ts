import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile.entity';
import * as jwt from 'jsonwebtoken';

@Controller('user-profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) { }

  @Post('line-login')
  async handleLineLogin(@Body() userProfile: Partial<UserProfile>): Promise<UserProfile> {
    console.log(userProfile)
    const decorded: any = jwt.decode(userProfile.email)
    // console.log(userProfile.email)
    console.log(decorded)
    console.log(decorded.email)
    userProfile.email = decorded.email 
    return this.userProfileService.createOrUpdate(userProfile);
  }

  @Get()
  async findAll() {
    console.log('get')
    return this.userProfileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userProfileService.findOne(id);
  }
}
