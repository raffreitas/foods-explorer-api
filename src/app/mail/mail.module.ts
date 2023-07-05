import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailService } from './services/mail.service';
import { MailEntity } from './entities/mail.entity';
import { MailCron } from './cron/mail.cron';

import { SendgridModule } from '../sendgrid/sendgrid.module';

@Module({
    imports: [TypeOrmModule.forFeature([MailEntity]), SendgridModule],
    providers: [MailService, MailCron],
    exports: [MailService],
})
export class MailModule {}
