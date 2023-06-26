import { extname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { diskStorage } from 'multer';

const UPLOAD_DIR = resolve(__dirname, '..', '..', 'uploads');

const MULTER_STORAGE = diskStorage({
    destination: UPLOAD_DIR,
    filename(_, file: Express.Multer.File, callback: CallableFunction) {
        const fileId = randomUUID();
        const ext = extname(file.originalname);
        callback(null, fileId.concat(ext));
    },
});

export { MULTER_STORAGE };
