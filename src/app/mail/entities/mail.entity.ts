import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { MailStatusEnum } from '../enum/mail-status.enum';

@Entity({ name: 'mails' })
export class MailEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'destination_name', nullable: false })
    destinationName: string;

    @Column({ name: 'destination_address', nullable: false })
    destinationAddress: string;

    @Column({ name: 'due_date', type: 'timestamp', nullable: true })
    dueDate: string;

    @Column({ nullable: false })
    subject: string;

    @Column({ nullable: false })
    body: string;

    @Column({ default: MailStatusEnum.WAITING })
    status: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}
