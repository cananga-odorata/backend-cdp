import { Entity, ObjectIdColumn, ObjectId,Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserProfile {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    line_user_id: string;

    @Column()
    display_name: string;
    
    @Column()
    email: string;

    @Column()
    profile_picture_url: string;

    @Column()
    status_message: string;

    @Column()
    language: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
