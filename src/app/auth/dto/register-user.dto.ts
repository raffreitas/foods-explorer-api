import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper, RegExHelper } from '../../../helpers';

export class RegisterUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password, {
        message: MessagesHelper.PASSWORD_VALID,
    })
    password: string;
}
