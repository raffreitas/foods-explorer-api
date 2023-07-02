import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { UploadsModule } from './uploads/uploads.module';
import { MailModule } from './mail/mail.module';
import { SendgridModule } from './sendgrid/sendgrid.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'example',
            database: 'shop',
            synchronize: true,
            autoLoadEntities: true,
        }),
        ScheduleModule.forRoot(),
        UsersModule,
        AuthModule,
        ProductsModule,
        UploadsModule,
        MailModule,
        SendgridModule,
    ],
})
export class AppModule {}
