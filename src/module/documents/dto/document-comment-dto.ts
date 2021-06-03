import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DocumentCommentDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  @IsOptional()
  documentId: number;

  @IsString()
  comment: number;
}
