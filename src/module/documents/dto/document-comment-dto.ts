import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DocumentCommentDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  comment: number;
}
