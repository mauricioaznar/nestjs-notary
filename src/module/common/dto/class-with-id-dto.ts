import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClassWithIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
