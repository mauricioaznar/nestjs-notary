import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DocumentAttachmentDto } from '../dto/document-attachment-dto';
import { Attachments } from '../../../entity/Attachments';
import { ClassWithIdDto } from '../../common/dto/class-with-id-dto';

@ValidatorConstraint({ name: 'AreDocumentAttachmentsValid', async: true })
@Injectable()
export class AreDocumentAttachmentsValidConstraint
  implements ValidatorConstraintInterface {
  constructor(protected readonly _connection: Connection) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'One of the document attachments is not compatible with the document type or does not match with attachments';
  }

  async validate(
    value: DocumentAttachmentDto[],
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (!value) return false;
    if (!validationArguments && !validationArguments.object) return false;
    const document: any = validationArguments.object;
    const documentTypeId = document.documentTypeId;
    const attachments: ClassWithIdDto[] = document.attachments;
    if (!attachments) return false;
    if (attachments.length !== value.length) return false;
    const doArraysMatch = attachments.every(({ id }) => {
      return value.find(
        (documentAttachment) => documentAttachment.attachmentId === id,
      );
    });
    if (!doArraysMatch) return false;
    if (!documentTypeId) return false;
    let isValid = true;
    for await (const { attachmentId } of value) {
      const attachment = await this._connection
        .getRepository(Attachments)
        .createQueryBuilder('attachments')
        .leftJoinAndSelect(
          'attachments.documentTypeAttachments',
          'documentTypeAttachments',
          'documentTypeAttachments.active = 1',
        )
        .where({
          id: attachmentId,
        })
        .getOne();
      const hasDocumentType = attachment.documentTypeAttachments.find(
        (documentTypeAttachment) => {
          return documentTypeAttachment.documentTypeId === documentTypeId;
        },
      );
      if (!hasDocumentType) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
}
