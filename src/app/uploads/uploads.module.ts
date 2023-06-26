import { Module } from '@nestjs/common';
import { UploadsService } from './services/uploads.service';
import { UploadsController } from './controllers/uploads.controller';

@Module({
    providers: [UploadsService],
    exports: [UploadsService],
    controllers: [UploadsController],
})
export class UploadsModule {}
