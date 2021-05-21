import { IsNumber, Max, Min, Validate } from 'class-validator';
import { IsEntityActiveConstraint } from '../../common/validator/is-entity-active-constraint';
import { Attachments } from '../../../entity/Attachments';

export class DocumentAttachmentDto {
  @IsNumber()
  @Validate(IsEntityActiveConstraint, [Attachments])
  attachmentId: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  attachmentStatus: number;
}
