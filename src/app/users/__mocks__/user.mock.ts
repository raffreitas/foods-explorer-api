import { UserEntity } from '../entities/user.entity';
import { UserRole } from '../enum/user-role.enum';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from '../dto';

export const userEntityMock: UserEntity = {
    id: '1',
    username: 'test',
    password: '$2b$10$aKYLdCXFFy8C54vDiDlmY.tu3n9MxKpCL2z3I3oySjZJxDHk7/gtW',
    email: 'test@test.com',
    avatar: 'test',
    role: UserRole.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const createUserMock: CreateUserDto = {
    username: 'test',
    password: 'test',
    email: 'email@testing.com',
    avatar: 'test',
};

export const updateUserMock: UpdateUserDto = {
    username: 'testing',
    avatar: 'test',
};

export const updatedUserEntityItem: UserEntity = {
    ...userEntityMock,
    username: 'testing',
    avatar: 'test',
};

export const updateUserPasswordMock: UpdateUserPasswordDto = {
    currentPassword: '123',
    newPassword: 'test@@123A',
};

export const updateUserPasswordInvalidMock: UpdateUserPasswordDto = {
    currentPassword: 'teste',
    newPassword: '123',
};
