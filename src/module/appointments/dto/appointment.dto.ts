import {
  Allow,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ClassWithIdDto } from '../../common/dto/class-with-id-dto';
import { IsDateAfterConstraint } from '../../common/validator/is-date-after';

// @ValidateIf((object, value) => value !== null)

export class AppointmentDto {
  @IsNotEmpty({
    message: 'Nombre es requerido',
  })
  name: string;

  @IsNumber(
    {},
    {
      message: 'Sala es requerido',
    },
  )
  roomId: number;

  @IsString()
  @IsDefined()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @Validate(IsDateAfterConstraint, ['startDate'])
  endDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ClassWithIdDto)
  users: ClassWithIdDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ClassWithIdDto)
  clients: ClassWithIdDto[];
}
