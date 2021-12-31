import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Connection } from 'typeorm';
import { FilesService } from '../files/files.service';
import { DocumentFile } from '../../entity/DocumentFile';

@Injectable()
export class DocumentsCronService {
  private daysBeforeDeletion = '1';

  constructor(
    private _connection: Connection,
    private filesService: FilesService,
  ) {}

  @Cron('* * 12 * * 7')
  async handleDocumentFiles() {
    await this._connection.transaction(async (manager) => {
      const documentFiles = await manager
        .getRepository(DocumentFile)
        .createQueryBuilder()
        .where('active = 1')
        .andWhere(
          `DATE(created_at) < CURDATE() - INTERVAL ${this.daysBeforeDeletion} DAY`,
        )
        .getMany();

      await manager
        .getRepository(DocumentFile)
        .createQueryBuilder()
        .where('active = 1')
        .andWhere(
          `DATE(created_at) < CURDATE() - INTERVAL ${this.daysBeforeDeletion} DAY`,
        )
        .update({ active: () => '-1' })
        .execute();

      await this.filesService.deleteFilesIfExists(documentFiles);
    });
  }
}
