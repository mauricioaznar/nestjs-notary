import { ObjectLiteral } from 'typeorm';
import { BaseCustomEntity } from '../../../entity/helpers/BaseCustomEntity';

export default interface ObjectBaseEntity
  extends ObjectLiteral,
    BaseCustomEntity {}
