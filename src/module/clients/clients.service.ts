import { Inject, Injectable, Scope } from '@nestjs/common';
import { ClientDto } from './dto/client.dto';
import { Brackets, Connection, Repository } from 'typeorm';
import { Clients } from '../../entity/Clients';
import { Pagination } from '../common/pagination/pagination';
import { PaginationQueryParamsDto } from '../common/dto/pagination-query-params-dto';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { BaseService } from '../common/service/base-service';
import { ClientGrantor } from '../../entity/ClientGrantor';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class ClientsService extends BaseService {
  constructor(
    protected _connection: Connection,
    @Inject(REQUEST) request: Request,
  ) {
    super(_connection, request);
  }

  async create(clientDto: ClientDto) {
    const id = await this._connection.transaction(async (manager) => {
      const { grantors, ...client } = clientDto;
      const fullname = `${client.name} ${client.lastname}`;
      const createResult = await this.createEntity(
        manager.getRepository(Clients),
        { ...client, fullname },
      );
      const createId = createResult.identifiers[0].id;
      await this.createEntities(
        manager.getRepository(ClientGrantor),
        grantors.map((g) => ({ grantorId: g.id, clientId: createId })),
      );
      return createId;
    });
    return this.findOne(id);
  }

  async update(id: number, clientDto: ClientDto) {
    await this._connection.transaction(async (manager) => {
      const { grantors, ...client } = clientDto;
      const fullname = `${client.name} ${client.lastname}`;
      await this.updateEntity(
        manager.getRepository(Clients),
        { ...client, fullname },
        id,
      );
      const updatedClient = await this.findOne(id);
      await this.updateEntitiesByArrays(
        manager.getRepository(ClientGrantor),
        { columnName: 'clientId', id },
        { columnName: 'grantorId' },
        updatedClient.grantors,
        grantors,
      );
    });
    // TODO do this with all entities (transacton hasnt finished)
    return await this.findOne(id);
  }

  async findAll() {
    return await this._connection
      .getRepository(Clients)
      .createQueryBuilder('clients')
      .where('clients.active = 1')
      .orderBy('clients.updatedAt', 'DESC')
      .getMany();
  }

  // TODO change the pagination method to query builder style
  async paginate(
    params: PaginationQueryParamsDto,
  ): Promise<Pagination<Clients>> {
    const { itemsPerPage, page, search } = params;

    const options: FindManyOptions = {
      take: itemsPerPage,
      skip: itemsPerPage * (page - 1),
    };

    // if (params.sortBy && !Object(new Clients()).hasOwnProperty(params.sortBy)) {
    //   throw new BadRequestException(`${params.sortBy} is not a valid property`);
    // } else if (params.sortBy) {
    //   options.order = {
    //     [params.sortBy]: params.sortDesc ? 1 : -1,
    //   };
    // }

    const [results, total] = await this._connection
      .getRepository(Clients)
      .createQueryBuilder('clients')
      .where('clients.active = 1')
      .leftJoinAndSelect(
        'clients.grantors',
        'grantors',
        'clients_grantors.active = 1',
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('grantors.fullname LIKE :search', {
            search: `%${search}%`,
          }).orWhere('clients.fullname LIKE :search', {
            search: `%${search}%`,
          });
          qb.orWhere('clients.email LIKE :search', {
            search: `%${search}%`,
          });
        }),
      )
      .take(options.take)
      .skip(options.skip)
      .orderBy('clients.updatedAt', 'DESC')
      .getManyAndCount();

    return new Pagination<Clients>({
      results,
      total,
      itemsPerPage,
      page,
    });
  }

  async findOne(id: number) {
    return await this._connection
      .getRepository(Clients)
      .createQueryBuilder('clients')
      .leftJoinAndSelect(
        'clients.grantors',
        'grantors',
        'clients_grantors.active = 1',
      )
      .where('clients.active = 1')
      .andWhere('clients.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    await this._connection.transaction(async (manager) => {
      const client = await this.findOne(id);

      await this.updateEntitiesByArrays(
        manager.getRepository(ClientGrantor),
        { columnName: 'clientId', id },
        { columnName: 'grantorId' },
        client.grantors,
        [],
      );

      return await manager
        .getRepository(Clients)
        .createQueryBuilder()
        .update()
        .set({
          active: -1,
        })
        .where('id = :id', { id })
        .execute();
    });
    return client;
  }
}
