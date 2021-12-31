import { DocumentDto } from './document-dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ClassWithIdDto } from '../../common/dto/class-with-id-dto';

export default class UpdateDocumentDto extends DocumentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassWithIdDto)
  documentFiles: ClassWithIdDto[];
}
