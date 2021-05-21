import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ClassWithIdDto } from '../../common/dto/class-with-id-dto';
import { Operations } from '../../../entity/Operations';

@ValidatorConstraint({ name: 'AreOperationsValid', async: true })
@Injectable()
export class AreOperationsValidConstraint
  implements ValidatorConstraintInterface {
  constructor(protected readonly _connection: Connection) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'One of the operations is not compatible with the document type';
  }

  async validate(
    value: ClassWithIdDto[],
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (!value) return false;
    if (!validationArguments && !validationArguments.object) return false;
    const document: any = validationArguments.object;
    const documentTypeId = document.documentTypeId;
    if (!documentTypeId) return false;
    let isValid = true;
    for await (const { id } of value) {
      const operation = await this._connection
        .getRepository(Operations)
        .createQueryBuilder('operations')
        .leftJoinAndSelect(
          'operations.documentTypeOperations',
          'documentTypeOperations',
          'documentTypeOperations.active = 1',
        )
        .where({
          id,
        })
        .getOne();
      const hasDocumentType = operation.documentTypeOperations.find(
        (documentTypeOperation) => {
          return documentTypeOperation.documentTypeId === documentTypeId;
        },
      );
      if (!hasDocumentType) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
}
