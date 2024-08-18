import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('register')
    async register(@Body() body: { email: string; password: string; name: string }): Promise<User> {
        return this.authService.register(body.email, body.password, body.name);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }): Promise<{ accessToken: string }> {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return this.authService.login(user);
    }
}
