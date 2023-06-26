import {
    Controller,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploadsService } from '../services/uploads.service';

import { MULTER_STORAGE } from '../../../helpers';
import { AuthGuard } from '@nestjs/passport';

@Controller('uploads')
@UseGuards(AuthGuard('jwt'))
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: MULTER_STORAGE,
        }),
    )
    upload(
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image',
                })
                .build({
                    fileIsRequired: true,
                    errorHttpStatusCode: 400,
                }),
        )
        file: Express.Multer.File,
    ) {
        return this.uploadsService.upload(file);
    }
}
