import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventId: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    date: string;
}
