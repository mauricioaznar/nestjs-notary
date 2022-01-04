import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import * as moment from 'moment';
import { Type } from 'class-transformer';
import { ClassWithIdDto } from '../../common/dto/class-with-id-dto';
import { DocumentAttachmentDto } from './document-attachment-dto';
import { AreDocumentAttachmentsValidConstraint } from '../validator/are-document-attachments-valid';
import { AreOperationsValidConstraint } from '../validator/are-document-operations-valid';
import { IsEntityActiveConstraint } from '../../common/validator/is-entity-active-constraint';
import { DocumentStatus } from '../../../entity/DocumentStatus';
import { DocumentType } from '../../../entity/DocumentType';
import { Clients } from '../../../entity/Clients';
import { AreEntitiesActiveConstraint } from '../../common/validator/are-entities-active-constraint';
import { Operations } from '../../../entity/Operations';
import { Grantors } from '../../../entity/Grantors';
import { Groups } from '../../../entity/Groups';
import { Attachments } from '../../../entity/Attachments';

export class DocumentDto {
  @IsNumber()
  @Min(1)
  @Max(400)
  folio: number;

  @IsNumber()
  @Min(2000)
  @Max(moment().add(1, 'year').year())
  year: number;

  @Matches(/^[0-9]+([-][0-9]+)?$/)
  @IsString()
  tome: string;

  @IsNumber()
  @Validate(IsEntityActiveConstraint, [DocumentStatus])
  documentStatusId: number;

  @IsNumber()
  @Validate(IsEntityActiveConstraint, [DocumentType])
  documentTypeId: number;

  @IsNumber()
  @Validate(IsEntityActiveConstraint, [Clients])
  clientId: number;

  @IsDateString()
  @IsOptional()
  expectedCompletionDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Validate(AreOperationsValidConstraint)
  @Validate(AreEntitiesActiveConstraint, [Operations])
  @Type(() => ClassWithIdDto)
  operations: ClassWithIdDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Validate(AreEntitiesActiveConstraint, [Grantors])
  @Type(() => ClassWithIdDto)
  grantors: ClassWithIdDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Validate(AreEntitiesActiveConstraint, [Groups])
  @Type(() => ClassWithIdDto)
  groups: ClassWithIdDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Validate(AreEntitiesActiveConstraint, [Attachments])
  @Type(() => ClassWithIdDto)
  attachments: ClassWithIdDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Validate(AreDocumentAttachmentsValidConstraint)
  @Type(() => DocumentAttachmentDto)
  documentAttachments: DocumentAttachmentDto[];
}
