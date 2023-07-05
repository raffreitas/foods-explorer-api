import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { UpdateUserDto, CreateUserDto, UpdateUserPasswordDto } from './dto';

import { MailService } from '../mail/services/mail.service';

import { MessagesHelper } from '../../helpers';
import {
    compareHashedPassword,
    createHashedPassword,
} from '../../utils/password';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly mailService: MailService,
    ) {}

    async findOneOrFail(options: FindOptionsWhere<UserEntity>) {
        try {
            return await this.usersRepository.findOneByOrFail(options);
        } catch (error) {
            throw new NotFoundException(MessagesHelper.NOT_FOUND);
        }
    }

    async store(data: CreateUserDto) {
        const hashedPassword = await createHashedPassword(data.password);

        const user = this.usersRepository.create({
            ...data,
            password: hashedPassword,
        });

        await this.usersRepository.save(user);
        await this.mailService.saveMail({
            subject: 'Foods Explorer',
            body: `<h1>Olá ${user.username}</h1><br/><p>Seja bem vindo ao Foods Explorer</p>`,
            destinationName: user.username,
            destinationAddress: user.email,
            dueDate: new Date().toISOString(),
        });

        return user;
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.findOneOrFail({ id });
        this.usersRepository.merge(user, data);
        const updatedUser = await this.usersRepository.save(user);

        return {
            username: updatedUser.username,
            avatar: updatedUser.avatar,
        };
    }

    async updatePassword(id: string, data: UpdateUserPasswordDto) {
        const user = await this.findOneOrFail({ id });

        const isPasswordValid = await compareHashedPassword(
            data.currentPassword,
            user.password,
        );

        if (!isPasswordValid) {
            throw new BadRequestException(MessagesHelper.INVALID_PASSWORD);
        }

        const hashedPassword = await createHashedPassword(data.newPassword);

        this.usersRepository.merge(user, { password: hashedPassword });
        await this.usersRepository.save(user);

        return { message: MessagesHelper.PASSWORD_UPDATED };
    }
}
