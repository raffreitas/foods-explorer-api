import { IsISO8601, IsNotEmpty } from 'class-validator';

export class SendMailDto {
    @IsNotEmpty()
    destinationName: string;

    @IsNotEmpty()
    destinationAddress: string;

    @IsNotEmpty()
    @IsISO8601()
    dueDate: string;

    @IsNotEmpty()
    subject: string;

    @IsNotEmpty()
    body: string;
}
