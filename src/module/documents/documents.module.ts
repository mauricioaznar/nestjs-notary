import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { AreDocumentAttachmentsValidConstraint } from './validator/are-document-attachments-valid';
import { AreOperationsValidConstraint } from './validator/are-document-operations-valid';
import { ActivitiesModule } from '../activities/activities.module';

@Module({
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    AreDocumentAttachmentsValidConstraint,
    AreOperationsValidConstraint,
  ],
  imports: [ActivitiesModule],
})
export class DocumentsModule {}
