import { Inject, Injectable } from '@nestjs/common';
import { Brackets, Connection, Repository } from 'typeorm';
import { Grantors } from '../../entity/Grantors';
import { ClientGrantor } from '../../entity/ClientGrantor';
import { PaginationQueryParamsDto } from '../common/dto/pagination-query-params-dto';
import { Pagination } from '../common/pagination/pagination';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { BaseService } from '../common/service/base-service';
import { GrantorDto } from './dto/grantor.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class GrantorsService extends BaseService {
  constructor(_connection: Connection, @Inject(REQUEST) request: Request) {
    super(_connection, request);
  }

  async create(grantorDto: GrantorDto) {
    const id = await this._connection.transaction(async (manager) => {
      const { clients, ...grantor } = grantorDto;
      const fullname = `${grantor.name} ${grantor.lastname}`;
      const createResult = await this.createEntity(
        manager.getRepository(Grantors),
        { ...grantor, fullname },
      );
      const createId = createResult.identifiers[0].id;
      await this.createEntities(
        manager.getRepository(ClientGrantor),
        clients.map((c) => ({ clientId: c.id, grantorId: createId })),
      );
      return createId;
    });
    return this.findOne(id);
  }

  async update(id: number, grantorDto: GrantorDto) {
    await this._connection.transaction(async (manager) => {
      const { clients, ...grantor } = grantorDto;
      const fullname = `${grantor.name} ${grantor.lastname}`;
      await this.updateEntity(
        manager.getRepository(Grantors),
        { ...grantor, fullname },
        id,
      );
      const updatedGrantor = await this.findOne(id);
      await this.updateEntitiesByArrays(
        manager.getRepository(ClientGrantor),
        { columnName: 'grantorId', id },
        { columnName: 'clientId' },
        updatedGrantor.clients,
        clients,
      );
    });
    return await this.findOne(id);
  }

  async findAll() {
    return await this._connection
      .getRepository(Grantors)
      .createQueryBuilder('grantors')
      .where('grantors.active = 1')
      .orderBy('grantors.updatedAt', 'DESC')
      .getMany();
  }

  // TODO change the pagination method to query builder style
  async paginate(
    params: PaginationQueryParamsDto,
  ): Promise<Pagination<Grantors>> {
    const { itemsPerPage, page, search } = params;

    const options: FindManyOptions = {
      take: itemsPerPage,
      skip: itemsPerPage * (page - 1),
    };

    // if (params.sortBy && !Object(new Grantors()).hasOwnProperty(params.sortBy)) {
    //   throw new BadRequestException(`${params.sortBy} is not a valid property`);
    // } else if (params.sortBy) {
    //   options.order = {
    //     [params.sortBy]: params.sortDesc ? 1 : -1,
    //   };
    // }

    const [results, total] = await this._connection
      .getRepository(Grantors)
      .createQueryBuilder('grantors')
      .where('grantors.active = 1')
      .leftJoinAndSelect(
        'grantors.clients',
        'clients',
        'grantors_clients.active = 1',
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('clients.fullname LIKE :search', {
            search: `%${search}%`,
          }).orWhere('grantors.fullname LIKE :search', {
            search: `%${search}%`,
          });
          qb.orWhere('grantors.email LIKE :search', {
            search: `%${search}%`,
          });
        }),
      )
      .take(options.take)
      .skip(options.skip)
      .orderBy('grantors.updatedAt', 'DESC')
      .getManyAndCount();

    return new Pagination<Grantors>({
      results,
      total,
      itemsPerPage,
      page,
    });
  }

  async findOne(id: number) {
    return await this._connection
      .getRepository(Grantors)
      .createQueryBuilder('grantors')
      .leftJoinAndSelect(
        'grantors.clients',
        'clients',
        'grantors_clients.active = 1',
      )
      .where('grantors.active = 1')
      .andWhere('grantors.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    const grantor = await this.findOne(id);
    await this._connection.transaction(async (manager) => {
      const grantor = await this.findOne(id);

      await this.updateEntitiesByArrays(
        manager.getRepository(ClientGrantor),
        { columnName: 'grantorId', id },
        { columnName: 'clientId' },
        grantor.clients,
        [],
      );

      return await manager
        .getRepository(Grantors)
        .createQueryBuilder()
        .update()
        .set({
          active: -1,
        })
        .where('id = :id', { id })
        .execute();
    });
    return grantor;
  }
}
