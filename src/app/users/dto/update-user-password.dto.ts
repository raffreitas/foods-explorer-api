import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { RegExHelper, MessagesHelper } from '../../../helpers';

export class UpdateUserPasswordDto {
    @IsNotEmpty()
    @Matches(RegExHelper.password, {
        message: MessagesHelper.PASSWORD_VALID,
    })
    newPassword: string;

    @IsString()
    currentPassword: string;
}
