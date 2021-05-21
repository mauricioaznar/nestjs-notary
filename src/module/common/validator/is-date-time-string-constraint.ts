import * as moment from 'moment';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';

@ValidatorConstraint({ name: 'isDateTimeString', async: false })
export class IsDateTimeStringConstraint
  implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return moment(propertyValue, datetimeFormat).isValid();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must have format ${datetimeFormat}`;
  }
}
