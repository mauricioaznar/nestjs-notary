import { ActivityDto } from './dto/activity.dto';
import { Inject, Injectable } from '@nestjs/common';
import { AuthGateway } from '../common/gateway/AuthGateway';
import { BaseService } from '../common/service/base-service';
import { Connection } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Activities } from '../../entity/Activities';
import { Users } from '../../entity/Users';

@Injectable()
export class ActivitiesService extends BaseService {
  constructor(
    private readonly authGateway: AuthGateway,
    protected _connection: Connection,
    @Inject(REQUEST) request: Request,
  ) {
    super(_connection, request);
  }

  async registerUpdate(activityDto: ActivityDto) {
    await this.registerActivity(activityDto, 'update');
  }

  async registerDelete(activityDto: ActivityDto) {
    await this.registerActivity(activityDto, 'delete');
  }

  async registerCreate(activityDto: ActivityDto) {
    await this.registerActivity(activityDto, 'create');
  }

  private async registerActivity(
    activityDto: ActivityDto,
    type: 'update' | 'create' | 'delete',
  ) {
    const { entity, ...activity } = activityDto;
    const id = await this._connection.transaction(async (manager) => {
      const user = this.request.user as Users;
      const createResult = await this.createEntity(
        manager.getRepository(Activities),
        {
          ...activity,
          userId: user.id,
          entityId: entity.id,
          type,
        },
      );
      const createId = createResult.identifiers[0].id;
      return createId;
    });
    const newActivity = await this.findOne(id);
    this.authGateway.emit('new_activity', { ...newActivity, entity: entity });
  }

  async findOne(id: number) {
    return await this._connection
      .getRepository(Activities)
      .createQueryBuilder('activities')
      .leftJoinAndSelect('activities.user', 'user', 'user.active = 1')
      .where('activities.active = 1')
      .andWhere('activities.id = :id', { id })
      .getOne();
  }

  async findAll() {
    return await this._connection
      .getRepository(Activities)
      .createQueryBuilder('activities')
      .leftJoinAndSelect('activities.user', 'user', 'user.active = 1')
      .where('activities.active = 1')
      .orderBy('activities.updatedAt', 'DESC')
      .getMany();
  }
}
