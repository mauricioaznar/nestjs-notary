import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ClassWithIdDto } from '../../common/dto/class-with-id-dto';
import { AreEntitiesActiveConstraint } from '../../common/validator/are-entities-active-constraint';
import { Groups } from '../../../entity/Groups';
import { IsEntityActiveConstraint } from '../../common/validator/is-entity-active-constraint';
import { Roles } from '../../../entity/Roles';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNumber(
    {},
    {
      message: 'Rol es requerido',
    },
  )
  @Validate(IsEntityActiveConstraint, [Roles])
  roleId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ClassWithIdDto)
  @Validate(AreEntitiesActiveConstraint, [Groups])
  groups: ClassWithIdDto[];
}
