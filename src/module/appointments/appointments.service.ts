import { Inject, Injectable } from '@nestjs/common';
import { AppointmentDto } from './dto/appointment.dto';
import { Brackets, Connection, Repository } from 'typeorm';
import { Appointments } from '../../entity/Appointments';
import { AppointmentUser } from '../../entity/AppointmentUser';
import { AppointmentClient } from '../../entity/AppointmentClient';
import { BaseService } from '../common/service/base-service';
import { DocumentGroup } from '../../entity/DocumentGroup';
import { Users } from '../../entity/Users';
import { AuthGateway } from '../common/gateway/AuthGateway';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AppointmentsService extends BaseService {
  constructor(
    protected _connection: Connection,
    @Inject(REQUEST) request: Request,
  ) {
    super(_connection, request);
  }

  async create(appointmentDto: AppointmentDto, user: Users) {
    const result = await this._connection.transaction(async (manager) => {
      const { users, clients, ...appointment } = appointmentDto;
      const createResult = await this.createEntity(
        manager.getRepository(Appointments),
        { ...appointment, createdByUserId: user.id },
      );
      const createId = createResult.identifiers[0].id;
      await this.createEntities(
        manager.getRepository(AppointmentUser),
        users.map((user) => ({ userId: user.id, appointmentId: createId })),
      );
      await this.createEntities(
        manager.getRepository(AppointmentClient),
        clients.map((client) => ({
          clientId: client.id,
          appointmentId: createId,
        })),
      );
      return createId;
    });
    return await this.findOne(result);
  }

  async canUserUpdate(appointment: Appointments, user: Users) {
    return user.roleId === 1 || appointment.createdByUserId === user.id;
  }

  async update(id: number, appointmentDto: AppointmentDto) {
    await this._connection.transaction(async (manager) => {
      const { users, clients, ...appointment } = appointmentDto;
      await this.updateEntity(
        manager.getRepository(Appointments),
        appointment,
        id,
      );
      const updatedAppointment = await this.findOne(id);
      await this.updateEntitiesByArrays(
        manager.getRepository(AppointmentUser),
        { columnName: 'appointmentId', id },
        { columnName: 'userId' },
        updatedAppointment.users,
        users,
      );
      await this.updateEntitiesByArrays(
        manager.getRepository(AppointmentClient),
        { columnName: 'appointmentId', id },
        { columnName: 'clientId' },
        updatedAppointment.clients,
        clients,
      );
    });
    return await this.findOne(id);
  }

  findAll(startDate: string) {
    return this._connection
      .getRepository(Appointments)
      .createQueryBuilder('appointments')
      .leftJoinAndSelect('appointments.room', 'rooms', 'rooms.active = 1')
      .leftJoinAndSelect(
        'appointments.createdByUser',
        'createdUsers',
        'createdUsers.active = 1',
      )
      .leftJoinAndSelect(
        'appointments.clients',
        'clients',
        'appointments_clients.active = 1',
      )
      .leftJoinAndSelect(
        'appointments.users',
        'users',
        'appointments_users.active = 1',
      )
      .where('appointments.active = 1')
      .andWhere(
        new Brackets((qb) => {
          qb.where('appointments.startDate LIKE :startDate', {
            startDate: `%${startDate}%`,
          });
        }),
      )
      .orderBy('appointments.updatedAt', 'DESC')
      .getMany();
  }

  // TODO make a better search for other entities
  async findTest({ search }) {
    const appointments = await this._connection
      .getRepository(Appointments)
      .createQueryBuilder('appointments')
      .leftJoinAndSelect('appointments.room', 'room')
      .leftJoinAndSelect('appointments.createdByUser', 'user')
      .leftJoinAndSelect(
        'appointments.clients',
        'clients',
        'appointments_clients.active = 1',
      )
      .leftJoinAndSelect(
        'appointments.users',
        'users',
        'appointments_users.active = 1',
      )
      .where('appointments.active = 1')
      .andWhere(
        new Brackets((qb) => {
          qb.where('appointments.name LIKE :startDate', {
            startDate: `%${search}%`,
          });
          qb.orWhere('room.name LIKE :search', {
            search: `%${search}%`,
          });
        }),
      )
      .getMany();
  }

  async findOne(id: number) {
    return await this._connection
      .getRepository(Appointments)
      .createQueryBuilder('appointments')
      .leftJoinAndSelect('appointments.room', 'room')
      .leftJoinAndSelect('appointments.createdByUser', 'user')
      .leftJoinAndSelect(
        'appointments.clients',
        'clients',
        'appointments_clients.active = 1',
      )
      .leftJoinAndSelect(
        'appointments.users',
        'users',
        'appointments_users.active = 1',
      )
      .where('appointments.active = 1')
      .andWhere('appointments.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    const appointment = this.findOne(id);
    await this._connection.transaction(async (manager) => {
      const appointment = await this.findOne(id);

      await this.updateEntitiesByArrays(
        manager.getRepository(AppointmentClient),
        { columnName: 'appointmentId', id },
        { columnName: 'clientId' },
        appointment.clients,
        [],
      );

      await this.updateEntitiesByArrays(
        manager.getRepository(AppointmentUser),
        { columnName: 'appointmentId', id },
        { columnName: 'userId' },
        appointment.users,
        [],
      );

      return await manager
        .getRepository(Appointments)
        .createQueryBuilder()
        .update()
        .set({
          active: -1,
        })
        .where('id = :id', { id })
        .execute();
    });
    return appointment;
  }

  async isDateRangeValid(
    startDate: string,
    endDate: string,
    roomId: number,
    appointmentId?: string,
  ) {
    const query = this._connection
      .getRepository(Appointments)
      .createQueryBuilder('appointments')
      .where('appointments.active = 1')
      .andWhere('appointments.roomId = :roomId', { roomId })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            new Brackets((sb) => {
              sb.where('appointments.startDate <= :startDate', {
                startDate: `${startDate}`,
              }).andWhere('appointments.endDate > :startDate', {
                startDate: `${startDate}`,
              });
            }),
          )
            .orWhere(
              new Brackets((sb) => {
                sb.where('appointments.startDate < :endDate', {
                  endDate: `${endDate}`,
                }).andWhere('appointments.endDate >= :endDate', {
                  endDate: `${endDate}`,
                });
              }),
            )
            .orWhere(
              new Brackets((sb) => {
                sb.where('appointments.startDate >= :startDate', {
                  startDate: `${startDate}`,
                }).andWhere('appointments.startDate < :endDate', {
                  endDate: `${endDate}`,
                });
              }),
            )
            .orWhere(
              new Brackets((sb) => {
                sb.where('appointments.endDate > :startDate', {
                  startDate: `${startDate}`,
                }).andWhere('appointments.endDate <= :endDate', {
                  endDate: `${endDate}`,
                });
              }),
            );
        }),
      );
    if (appointmentId) {
      query.andWhere('appointments.id != :id', { id: appointmentId });
    }
    const results = await query.getMany();
    return results.length === 0;
  }
}
