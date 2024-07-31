import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { ObjectId } from 'mongodb';


@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>,
    ) { }

    async createOrUpdate(userProfile: Partial<UserProfile>): Promise<UserProfile> {
        // console.log('Finding user with line_user_id:', userProfile.line_user_id);
        let user = await this.userProfileRepository.findOne({ where: { line_user_id: userProfile.line_user_id } });

        if (user) {
            // console.log('User found, updating:', user);
            await this.userProfileRepository.update(user._id, userProfile);
            return this.userProfileRepository.findOne({ where: { _id: user._id } });
        } else {
            // console.log('User not found, creating new user');
            user = this.userProfileRepository.create(userProfile);
            return this.userProfileRepository.save(user);
        }
    }
    async createUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
        const userProfile = this.userProfileRepository.create(data);
        return this.userProfileRepository.save(userProfile);
    }

    async findAll(): Promise<UserProfile[]> {
        return this.userProfileRepository.find();
    }

    async findOne(id: string): Promise<UserProfile> {
        return this.userProfileRepository.findOne({ where: { _id: new ObjectId(id) } });
    }
}
