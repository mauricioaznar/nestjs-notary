import { Inject, Injectable } from '@nestjs/common';
import { GroupDto } from './dto/group-dto';
import { Connection, Repository } from 'typeorm';
import { BaseService } from '../common/service/base-service';
import { Groups } from '../../entity/Groups';
import { UserGroup } from '../../entity/UserGroup';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class GroupsService extends BaseService {
  constructor(
    protected _connection: Connection,
    @Inject(REQUEST) request: Request,
  ) {
    super(_connection, request);
  }

  async create(groupDto: GroupDto) {
    const id = await this._connection.transaction(async (manager) => {
      const { users, ...group } = groupDto;
      const createResult = await this.createEntity(
        manager.getRepository(Groups),
        { ...group },
      );
      const createId = createResult.identifiers[0].id;
      await this.createEntities(
        manager.getRepository(UserGroup),
        users.map((user) => ({ userId: user.id, groupId: createId })),
      );
      return createId;
    });
    return this.findOne(id);
  }

  async update(id: number, groupDto: GroupDto) {
    await this._connection.transaction(async (manager) => {
      const { users, ...group } = groupDto;
      await this.updateEntity(manager.getRepository(Groups), { ...group }, id);
      const updatedGroup = await this.findOne(id);
      await this.updateEntitiesByArrays(
        manager.getRepository(UserGroup),
        { columnName: 'groupId', id },
        { columnName: 'userId' },
        updatedGroup.users,
        users,
      );
    });
    return await this.findOne(id);
  }

  async findAll() {
    return await this._connection
      .getRepository(Groups)
      .createQueryBuilder('groups')
      .leftJoinAndSelect('groups.users', 'users', 'groups_users.active = 1')
      .where('groups.active = 1')
      .orderBy('groups.updatedAt', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    return await this._connection
      .getRepository(Groups)
      .createQueryBuilder('groups')
      .leftJoinAndSelect('groups.users', 'users', 'groups_users.active = 1')
      .where('groups.active = 1')
      .andWhere('groups.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    await this._connection.transaction(async (manager) => {
      const group = await this.findOne(id);

      await this.updateEntitiesByArrays(
        manager.getRepository(UserGroup),
        { columnName: 'groupId', id },
        { columnName: 'userId' },
        group.users,
        [],
      );

      return await manager
        .getRepository(Groups)
        .createQueryBuilder()
        .update()
        .set({
          active: -1,
        })
        .where('id = :id', { id })
        .execute();
    });
    return group;
  }
}
