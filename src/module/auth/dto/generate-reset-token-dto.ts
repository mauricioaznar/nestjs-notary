import { IsNumber } from 'class-validator';

export class GenerateResetTokenDto {
  @IsNumber()
  userId: number;
}
