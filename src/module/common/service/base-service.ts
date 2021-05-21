import { Connection, ObjectLiteral, Repository } from 'typeorm';
import * as _ from 'lodash';
import { Request } from 'express';
import ObjectBaseEntity from './base-entity';

export class BaseService {
  constructor(protected _connection: Connection, protected request: Request) {}

  async createEntity(
    repository: Repository<ObjectBaseEntity>,
    inputs: ObjectLiteral,
  ) {
    return await repository
      .createQueryBuilder()
      .insert()
      .values({
        ...inputs,
        active: () => '1',
        createdAt: () => 'now()',
        updatedAt: () => 'now()',
      })
      .execute();
  }

  async createEntities(
    repository: Repository<ObjectBaseEntity>,
    inputs: ObjectLiteral[],
  ) {
    return await repository
      .createQueryBuilder()
      .insert()
      .values(
        inputs.map((val) => ({
          ...val,
          active: () => '1',
          createdAt: () => 'now()',
          updatedAt: () => 'now()',
        })),
      )
      .execute();
  }

  async updateEntity(
    repository: Repository<ObjectBaseEntity>,
    inputs: ObjectLiteral,
    id: number,
  ) {
    return await repository
      .createQueryBuilder()
      .update()
      .set({ ...inputs, updatedAt: () => 'now()' })
      .where('id = :id', { id })
      .execute();
  }

  async updateEntitiesByArrays(
    repository: Repository<ObjectBaseEntity>,
    hostEntityOptions: {
      columnName: string;
      id: number;
    },
    inverseEntityOptions: {
      columnName: string;
    },
    oldEntities: ObjectLiteral[],
    newEntities: ObjectLiteral[],
    extraProperties = {},
  ) {
    const iteratee = 'id';
    const deletedEntities = _.differenceBy(oldEntities, newEntities, iteratee);
    const createdEntities = _.differenceBy(newEntities, oldEntities, iteratee);

    for (const { [iteratee]: createdInverseId } of createdEntities) {
      await repository
        .createQueryBuilder()
        .insert()
        .values({
          [hostEntityOptions.columnName]: hostEntityOptions.id,
          [inverseEntityOptions.columnName]: createdInverseId,
          ...extraProperties,
          createdAt: () => 'now()',
          updatedAt: () => 'now()',
        })
        .execute();
    }

    for (const { id: deletedId } of deletedEntities) {
      await repository
        .createQueryBuilder()
        .update()
        .set({
          active: () => '-1',
          updatedAt: () => 'now()',
        })
        .where({
          [inverseEntityOptions.columnName]: deletedId,
          [hostEntityOptions.columnName]: hostEntityOptions.id,
          ...extraProperties,
        })
        .execute();
    }
  }
  async updateEntitiesByOneToMany(
    repository: Repository<ObjectBaseEntity>,
    hostEntityOptions: {
      columnName: string;
      id: number;
    },
    oldEntities: ObjectLiteral[],
    newEntities: ObjectLiteral[],
  ) {
    const iteratee = 'id';
    const newEntitiesWithId = newEntities.filter((entity) => entity.id);
    const createdEntities = newEntities.filter((entity) => !entity.id);
    const deletedEntities = _.differenceBy(
      oldEntities,
      newEntitiesWithId,
      iteratee,
    );
    const updatedEntities = _.intersectionBy(
      newEntitiesWithId,
      oldEntities,
      iteratee,
    );
    for (const { id, ...inputs } of updatedEntities) {
      await repository
        .createQueryBuilder()
        .update()
        .set({
          ...inputs,
          updatedAt: () => 'now()',
        })
        .where({
          [hostEntityOptions.columnName]: hostEntityOptions.id,
          id,
        })
        .execute();
    }
    for (const { ...inputs } of createdEntities) {
      await repository
        .createQueryBuilder()
        .insert()
        .values({
          [hostEntityOptions.columnName]: hostEntityOptions.id,
          ...inputs,
          createdAt: () => 'now()',
          updatedAt: () => 'now()',
        })
        .execute();
    }
    for (const { id } of deletedEntities) {
      await repository
        .createQueryBuilder()
        .update()
        .set({
          active: () => '-1',
          updatedAt: () => 'now()',
        })
        .where({
          id,
        })
        .execute();
    }
  }
}
