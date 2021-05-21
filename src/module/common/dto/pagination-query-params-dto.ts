import {
  IsBoolean,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaginationQueryParamsDto {
  @IsNotEmpty()
  @IsNumberString()
  page: number;

  @IsNotEmpty()
  @IsNumberString()
  itemsPerPage: number;

  @IsOptional()
  @IsBoolean()
  sortDesc: boolean;

  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsString()
  search: string;
}
