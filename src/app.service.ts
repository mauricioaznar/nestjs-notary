import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Clients } from './entity/Clients';
import { Roles } from './entity/Roles';
import { Rooms } from './entity/Rooms';
import { DocumentStatus } from './entity/DocumentStatus';
import { DocumentType as DocumentTypes } from './entity/DocumentType';
import { Operations } from './entity/Operations';
import { Attachments } from './entity/Attachments';

@Injectable()
export class AppService {
  private _clientsRepository: Repository<Clients>;

  constructor(private _connection: Connection) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getStatics() {
    const roles = await this._connection
      .getRepository(Roles)
      .createQueryBuilder('roles')
      .where('roles.active = 1')
      .getMany();
    const rooms = await this._connection
      .getRepository(Rooms)
      .createQueryBuilder('rooms')
      .where('rooms.active = 1')
      .getMany();
    const documentStatuses = await this._connection
      .getRepository(DocumentStatus)
      .createQueryBuilder('documentStatuses')
      .where('documentStatuses.active = 1')
      .getMany();
    const documentTypes = await this._connection
      .getRepository(DocumentTypes)
      .createQueryBuilder('documentTypes')
      .where('documentTypes.active = 1')
      .getMany();
    const documentOperations = await this._connection
      .getRepository(Operations)
      .createQueryBuilder('operations')
      .where('operations.active = 1')
      .leftJoinAndSelect(
        'operations.documentTypeOperations',
        'documentTypeOperations',
        'documentTypeOperations.active = 1',
      )
      .getMany();
    const documentAttachments = await this._connection
      .getRepository(Attachments)
      .createQueryBuilder('attachments')
      .where('attachments.active = 1')
      .leftJoinAndSelect(
        'attachments.documentTypeAttachments',
        'documentTypeAttachments',
        'documentTypeAttachments.active = 1',
      )
      .getMany();
    return {
      roles,
      rooms,
      documentStatuses,
      documentTypes,
      documentOperations,
      documentAttachments,
    };
  }
}
