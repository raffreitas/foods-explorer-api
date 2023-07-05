import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { MailService } from '../services/mail.service';
import { MailStatusEnum } from '../enum/mail-status.enum';
import { SendEmailInterface } from '../../sendgrid/interfaces/send-email.interface';

import { SendgridService } from '../../sendgrid/services/sendgrid.service';

@Injectable()
export class MailCron {
    constructor(
        private readonly mailService: MailService,
        private readonly sendGridService: SendgridService,
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handler() {
        const mailList = await this.mailService.findAll({
            dueDateLte: new Date().toISOString(),
            status: MailStatusEnum.WAITING,
        });

        for (const mail of mailList) {
            const data: SendEmailInterface = {
                personalizations: [
                    {
                        to: [
                            {
                                email: mail.destinationAddress,
                                name: mail.destinationName,
                            },
                        ],
                    },
                ],
                from: {
                    email: process.env.SENDGRID_FROM_EMAIL,
                    name: 'Contato | Foods Explorer',
                },
                reply_to: {
                    email: process.env.SENDGRID_REPLY_EMAIL,
                    name: 'Suporte | Foods Explorer',
                },
                subject: mail.subject,
                content: [
                    {
                        type: 'text/html',
                        value: mail.body,
                    },
                ],
            };

            await this.sendGridService.sendMail(data);
            await this.mailService.updateStatus(mail.id, MailStatusEnum.SENT);
        }

        return null;
    }
}
