import {
  IsArray,
  IsDateString,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ClassWithIdDto } from '../../common/dto/class-with-id-dto';
import { DocumentAttachmentDto } from './document-attachment-dto';
import { DocumentCommentDto } from './document-comment-dto';
import { DocumentPropertyDto } from './document-property-dto';
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
import { Users } from '../../../entity/Users';

export class DocumentDto {
  @IsNumber()
  @Min(1)
  @Max(400)
  folio: number;

  @IsDateString()
  date: string;

  @IsDateString()
  publicRegistryEntryDate: string;

  @IsDateString()
  publicRegistryExitDate: string;

  @IsNumberString()
  fileNumber: string;

  @Matches(/^[0-9]+([-][0-9]+)?$/)
  @IsString()
  tome: string;

  @IsString()
  property: string;

  @IsString()
  marginalNotes: string;

  @IsString()
  electronicFolio: string;

  @IsNumber()
  @Min(-1)
  @Max(1)
  moneyLaundering: string;

  @IsNumber()
  @Min(-1)
  @Max(1)
  personalities: string;

  @IsNumber()
  @Min(-1)
  @Max(1)
  documentRegistry: string;

  @IsNumber()
  @Min(-1)
  @Max(1)
  publicRegistryPatent: string;

  @IsNumber()
  @Min(-1)
  @Max(1)
  identifications: string;

  @IsDateString()
  @IsOptional()
  moneyLaunderingExpirationDate: string | null;

  @IsNumber()
  @Validate(IsEntityActiveConstraint, [DocumentStatus])
  documentStatusId: number;

  @IsNumber()
  @Validate(IsEntityActiveConstraint, [DocumentType])
  documentTypeId: number;

  @IsString()
  @IsOptional()
  documentTypeOther: string;

  @IsNumber()
  @Validate(IsEntityActiveConstraint, [Clients])
  clientId: number;

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
  @Validate(AreEntitiesActiveConstraint, [Users])
  @Type(() => ClassWithIdDto)
  entryUsers: ClassWithIdDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Validate(AreEntitiesActiveConstraint, [Users])
  @Type(() => ClassWithIdDto)
  closureUsers: ClassWithIdDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Validate(AreDocumentAttachmentsValidConstraint)
  @Type(() => DocumentAttachmentDto)
  documentAttachments: DocumentAttachmentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentCommentDto)
  documentComments: DocumentCommentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentPropertyDto)
  documentProperties: DocumentPropertyDto[];
}
