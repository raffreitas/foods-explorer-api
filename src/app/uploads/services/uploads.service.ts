import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
    async upload(file: Express.Multer.File) {
        return { fileName: file.filename };
    }
}
