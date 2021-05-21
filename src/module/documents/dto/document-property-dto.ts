import { IsNumber, IsString } from 'class-validator';

export class DocumentPropertyDto {
  @IsString()
  property: string;

  @IsNumber()
  electronicFolio: number;
}
