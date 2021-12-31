import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { AreDocumentAttachmentsValidConstraint } from './validator/are-document-attachments-valid';
import { AreOperationsValidConstraint } from './validator/are-document-operations-valid';
import { ActivitiesModule } from '../activities/activities.module';
import { FilesModule } from '../files/files.module';
import { MemoryTokenModule } from '../memory-token/memory-token.module';
import { DocumentsCronService } from './documents-cron.service';

@Module({
  imports: [ActivitiesModule, FilesModule, MemoryTokenModule],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    AreDocumentAttachmentsValidConstraint,
    AreOperationsValidConstraint,
    DocumentsCronService,
  ],
})
export class DocumentsModule {}
