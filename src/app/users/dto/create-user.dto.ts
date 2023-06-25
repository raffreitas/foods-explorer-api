import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper, MessagesHelper } from '../../../helpers';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    avatar?: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password, {
        message: MessagesHelper.PASSWORD_VALID,
    })
    password: string;
}
