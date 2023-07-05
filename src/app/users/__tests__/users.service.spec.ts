import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UsersService } from '../users.service';
import { UserEntity } from '../entities/user.entity';
import { MailService } from '../../mail/services/mail.service';

import {
    userEntityMock,
    createUserMock,
    updateUserMock,
    updatedUserEntityItem,
    updateUserPasswordMock,
    updateUserPasswordInvalidMock,
} from '../__mocks__/user.mock';

import { MessagesHelper } from '../../../helpers';

describe('UsersService', () => {
    let usersService: UsersService;
    let usersRepository: Repository<UserEntity>;
    let mailService: MailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOneByOrFail: jest
                            .fn()
                            .mockResolvedValue(userEntityMock),
                        create: jest.fn().mockReturnValue(userEntityMock),
                        save: jest.fn().mockResolvedValue(userEntityMock),
                        merge: jest.fn().mockReturnValue(updatedUserEntityItem),
                    },
                },
                {
                    provide: MailService,
                    useValue: {
                        saveMail: jest.fn(),
                    },
                },
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        mailService = module.get<MailService>(MailService);
        usersRepository = module.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(usersService).toBeDefined();
        expect(mailService).toBeDefined();
        expect(usersRepository).toBeDefined();
    });

    describe('findOneOrFail', () => {
        it('should return a user entity item successfully', async () => {
            const result = await usersService.findOneOrFail({
                id: userEntityMock.id,
            });

            expect(result).toEqual(userEntityMock);
            expect(usersRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
        });

        it('should throw a not found exception', () => {
            jest.spyOn(usersRepository, 'findOneByOrFail').mockRejectedValue(
                new Error(),
            );

            expect(
                usersService.findOneOrFail({ id: userEntityMock.id }),
            ).rejects.toThrowError(NotFoundException);
        });
    });

    describe('store', () => {
        it('should create a user entity item successfully', async () => {
            const result = await usersService.store(createUserMock);

            expect(result).toEqual(userEntityMock);
            expect(usersRepository.create).toHaveBeenCalledTimes(1);
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
            expect(mailService.saveMail).toHaveBeenCalledTimes(1);
            expect(mailService.saveMail).toHaveBeenCalledWith({
                subject: 'Foods Explorer',
                body: `<h1>Olá ${result.username}</h1><br/><p>Seja bem vindo ao Foods Explorer</p>`,
                destinationName: result.username,
                destinationAddress: result.email,
                dueDate: new Date().toISOString(),
            });
        });

        it('should throw an exception', () => {
            jest.spyOn(usersRepository, 'save').mockRejectedValue(new Error());

            expect(usersService.store(createUserMock)).rejects.toThrowError();
        });
    });

    describe('update', () => {
        it('should update a user entity item successfully', async () => {
            jest.spyOn(usersRepository, 'save').mockResolvedValueOnce(
                updatedUserEntityItem,
            );

            const result = await usersService.update(
                userEntityMock.id,
                updateUserMock,
            );

            expect(result).toEqual({
                username: updatedUserEntityItem.username,
                avatar: updatedUserEntityItem.avatar,
            });
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should throw an not found exception', () => {
            jest.spyOn(usersRepository, 'findOneByOrFail').mockRejectedValue(
                new Error(),
            );

            expect(
                usersService.update(userEntityMock.id, updateUserMock),
            ).rejects.toThrowError(NotFoundException);
        });
    });

    describe('updatePassword', () => {
        it('should update a user password successfully', async () => {
            const result = await usersService.updatePassword(
                userEntityMock.id,
                updateUserPasswordMock,
            );

            expect(result).toEqual({
                message: MessagesHelper.PASSWORD_UPDATED,
            });
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should throw a bad request exception if password is invalid', () => {
            const result = usersService.updatePassword(
                userEntityMock.id,
                updateUserPasswordInvalidMock,
            );

            expect(result).rejects.toThrowError(BadRequestException);
        });
    });
});
