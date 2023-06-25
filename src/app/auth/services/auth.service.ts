import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

import { UsersService } from '../../users/services/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MessagesHelper } from 'src/helpers';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(user: UserEntity) {
        const payload = { sub: user.id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: RegisterUserDto) {
        const userAlreadyExists = await this.usersService
            .findOneOrFail({
                email: data.email,
            })
            .catch(() => null);

        if (userAlreadyExists) {
            throw new BadRequestException(MessagesHelper.EMAIL_ALREADY_EXISTS);
        }

        await this.usersService.store(data);

        return { message: MessagesHelper.USER_CREATED };
    }

    async validateUser(email: string, password: string) {
        let user: UserEntity;
        try {
            user = await this.usersService.findOneOrFail({ email });
        } catch (error) {
            return null;
        }

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) return null;

        return user;
    }
}
