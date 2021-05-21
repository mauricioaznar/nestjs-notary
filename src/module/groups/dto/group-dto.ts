import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ClassWithIdDto } from '../../common/dto/class-with-id-dto';
import { AreEntitiesActiveConstraint } from '../../common/validator/are-entities-active-constraint';
import { Users } from '../../../entity/Users';

export class GroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ClassWithIdDto)
  @Validate(AreEntitiesActiveConstraint, [Users])
  users: ClassWithIdDto[];
}
