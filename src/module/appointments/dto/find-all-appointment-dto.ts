import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class FindAllAppointmentDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: string;
}
