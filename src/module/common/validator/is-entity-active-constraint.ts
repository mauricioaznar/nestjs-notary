import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'typeorm';

@ValidatorConstraint({ name: 'IsEntityActive', async: true })
export class IsEntityActiveConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly _connection: Connection) {}

  async validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;
    }
    const object = args.constraints[0];
    const entities = await this._connection
      .getRepository(object)
      .createQueryBuilder()
      .where('active = 1')
      .andWhere('id = :value', { value })
      .getMany();

    return entities.length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    if (!args.value) {
      return `${args.property} value is not valid`;
    }
    if (!args.constraints[0]) {
      return `class is not defined`;
    }
    return `${args.property} id  is no longer active in ${args.constraints[0]}`;
  }
}
