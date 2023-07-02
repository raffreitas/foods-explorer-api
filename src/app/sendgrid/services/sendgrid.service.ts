import { HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailInterface } from '../interfaces/send-email.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SendgridService {
    private readonly SENDGRID_API_URL = process.env.SENDGRID_API_URL;
    private readonly SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

    constructor(private readonly httpService: HttpService) {}

    async sendMail(data: SendEmailInterface) {
        const url = `${this.SENDGRID_API_URL}/mail/send`;
        const config = {
            headers: { Authorization: `Bearer ${this.SENDGRID_API_KEY}` },
        };

        const response = await lastValueFrom(
            this.httpService.post(url, data, config),
        );

        return response.status === HttpStatus.ACCEPTED;
    }
}
