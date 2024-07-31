import { Entity, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Events {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  user_id: string;

  @Column()
  type: string;

  @Column('json')
  message: any;

  @Column()
  timestamp: number;

  @CreateDateColumn()
  created_at: Date;
}
