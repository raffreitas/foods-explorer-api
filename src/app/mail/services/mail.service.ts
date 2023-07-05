import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailEntity } from '../entities/mail.entity';
import { Repository } from 'typeorm';
import { SendMailDto } from '../dto/send-mail.dto';
import { FindAllMailDto } from '../dto/find-all-mail.dto';
import { MailStatusEnum } from '../enum/mail-status.enum';

@Injectable()
export class MailService {
    constructor(
        @InjectRepository(MailEntity)
        private readonly mailRepository: Repository<MailEntity>,
    ) {}

    async saveMail(mail: SendMailDto): Promise<MailEntity> {
        return await this.mailRepository.save(mail);
    }

    async findAll(params?: Partial<FindAllMailDto>): Promise<MailEntity[]> {
        const query = this.mailRepository.createQueryBuilder('mail');

        if (params?.dueDateLte) {
            query.andWhere('mail.dueDate <= :dueDateLte', {
                dueDateLte: params.dueDateLte,
            });
        }
        if (params?.status) {
            query.andWhere('mail.status = :status', { status: params.status });
        }

        return await query.getMany();
    }

    async updateStatus(id: string, status: MailStatusEnum): Promise<void> {
        const mail = await this.mailRepository.findOneByOrFail({ id });
        this.mailRepository.merge(mail, { status });
        await this.mailRepository.save(mail);
    }
}
