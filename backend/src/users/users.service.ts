import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    async update(id: number, updateData: Partial<User>): Promise<User | null> {
        const user = await this.usersRepository.preload({
            id,
            ...updateData,
        });
        if (!user) {
            return null;
        }
        return this.usersRepository.save(user);
    }
}
