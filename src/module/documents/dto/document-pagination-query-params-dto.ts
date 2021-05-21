import { PaginationQueryParamsDto } from '../../common/dto/pagination-query-params-dto';
import { IsNumberString, IsString } from 'class-validator';

export class DocumentPaginationQueryParamsDto extends PaginationQueryParamsDto {
  @IsNumberString()
  year: string;
}
