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
    eventType: string;

    @Column()
    date: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    venue?: string;

    @Column({ nullable: true })
    url?: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ nullable: true })
    priceRange?: string;

    @Column({ nullable: true })
    audience?: string;
}
