import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class DocumentUniqueQueryParamsDto {
  @IsNumberString()
  year: string;

  @IsNumberString()
  folio: string;

  @IsString()
  tome: string;

  @IsNumberString()
  @IsOptional()
  id?: string;
}
