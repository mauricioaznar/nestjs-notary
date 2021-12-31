import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';
import { Request } from 'express';

@Injectable()
export class FilesService {
  async deleteFilesIfExists(files: { fileName: string }[]) {
    try {
      const promises = files.map(async (file) => {
        const { fileName } = file;
        const filePath = path.relative(process.cwd(), 'uploads/' + fileName);
        const exists = await fs.promises.stat(filePath);
        if (exists) {
          await fs.promises.unlink(filePath);
        }
        return {
          fileName,
        };
      });
      return Promise.all(promises);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createFiles(newFiles: Array<Express.Multer.File>) {
    try {
      const promises = newFiles.map(async (newPhoto) => {
        const randomString = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        const randomName = `${randomString}${extname(newPhoto.originalname)}`;
        const filePath = path.relative(process.cwd(), 'uploads/' + randomName);
        fs.createWriteStream(filePath).write(newPhoto.buffer);
        return {
          originalName: newPhoto.originalname,
          fileName: randomName,
        };
      });
      return Promise.all(promises);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  getFileBaseEndpointUrl(req: any) {
    return `http${req.secure ? 's' : ''}://${req.headers.host}/uploads`;
  }
}
