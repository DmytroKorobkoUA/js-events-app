import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly jwtSecret = process.env.JWT_SECRET;

    constructor(private readonly usersService: UsersService) {}

    async register(email: string, password: string, name: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.create({ email, password: hashedPassword, name });
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User): Promise<{ accessToken: string }> {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' }),
        };
    }
}
