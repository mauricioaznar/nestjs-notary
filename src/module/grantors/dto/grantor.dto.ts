import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ClassWithIdDto } from '../../common/dto/class-with-id-dto';
import { Type } from 'class-transformer';
import { AreEntitiesActiveConstraint } from '../../common/validator/are-entities-active-constraint';
import { Clients } from '../../../entity/Clients';

export class GrantorDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassWithIdDto)
  @Validate(AreEntitiesActiveConstraint, [Clients])
  clients: ClassWithIdDto[];
}
