import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'typeorm';
import { ClassWithIdDto } from '../dto/class-with-id-dto';

@ValidatorConstraint({ name: 'AreEntitiesActiveConstraint', async: true })
export class AreEntitiesActiveConstraint
  implements ValidatorConstraintInterface {
  constructor(protected readonly _connection: Connection) {}

  async validate(value: ClassWithIdDto[], args: ValidationArguments) {
    if (!value) {
      return false;
    }
    const object = args.constraints[0];
    let isValid = true;
    for await (const { id } of value) {
      const entities = await this._connection
        .getRepository(object)
        .createQueryBuilder()
        .where('active = 1')
        .andWhere('id = :id', { id })
        .getMany();
      if (entities.length === 0) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  defaultMessage(args: ValidationArguments) {
    if (!args.value) {
      return `${args.property} value is not valid`;
    }
    if (!args.constraints[0]) {
      return `class is not defined`;
    }
    return `${args.property}, an element is no longer active ${args.constraints[0]}`;
  }
}
