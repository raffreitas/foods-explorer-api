import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { UpdateUserDto } from '../dto/update-user.dto';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async findAll() {
        return await this.usersRepository.find({
            select: ['username', 'email', 'avatar', 'role'],
        });
    }

    async findOneOrFail(options: FindOptionsWhere<UserEntity>) {
        return await this.usersRepository.findOneByOrFail(options);
    }

    async store(data: CreateUserDto) {
        const user = this.usersRepository.create(data);
        return await this.usersRepository.save(user);
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.usersRepository.findOneByOrFail({ id });
        // TODO: Validar se está tentando alterar para um email que já existe
        this.usersRepository.merge(user, data);
        return await this.usersRepository.save(user);
    }
}
