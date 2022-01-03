import { Inject, Injectable } from '@nestjs/common';
import { DocumentDto } from './dto/document-dto';
import { Pagination } from '../common/pagination/pagination';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Brackets, Connection } from 'typeorm';
import { BaseService } from '../common/service/base-service';
import { Documents } from '../../entity/Documents';
import { DocumentOperation } from '../../entity/DocumentOperation';
import { DocumentGrantor } from '../../entity/DocumentGrantor';
import { DocumentGroup } from '../../entity/DocumentGroup';
import { DocumentAttachment } from '../../entity/DocumentAttachment';
import { DocumentComment } from '../../entity/DocumentComment';
import { Users } from '../../entity/Users';
import { DocumentPaginationQueryParamsDto } from './dto/document-pagination-query-params-dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DocumentCommentDto } from './dto/document-comment-dto';
import { DocumentFile } from '../../entity/DocumentFile';
import UpdateDocumentDto from './dto/update-document-dto';

@Injectable()
export class DocumentsService extends BaseService {
  constructor(_connection: Connection, @Inject(REQUEST) request: Request) {
    super(_connection, request);
  }

  async isDocumentFolioTomeDateValid(
    folio: number,
    tome: string,
    year: number,
    documentId?: number,
  ) {
    const query = this._connection
      .getRepository(Documents)
      .createQueryBuilder('documents')
      .where('documents.active = 1')
      .andWhere('documents.folio = :folio', { folio })
      .andWhere('documents.tome = :tome', { tome })
      .andWhere('documents.year = :year', { year });
    if (documentId) {
      query.andWhere('documents.id != :id', { id: documentId });
    }
    const results = await query.getMany();
    return results.length === 0;
  }

  async isUserAuthorizedToEditDocument(user: Users, document: Documents) {
    if (user.roleId === 1) {
      return true;
    }
    const documentGroups = document.groups;
    const userGroups = user.groups;
    return documentGroups.some((documentGroup) => {
      return userGroups.some((userGroup) => {
        return userGroup.id === documentGroup.id;
      });
    });
  }

  async create(documentDto: DocumentDto) {
    const id = await this._connection.transaction(async (manager) => {
      const {
        operations,
        grantors,
        groups,
        attachments,
        documentAttachments,
        ...document
      } = documentDto;
      const createResult = await this.createEntity(
        manager.getRepository(Documents),
        { ...document },
      );
      const createId = createResult.identifiers[0].id;
      await this.createEntities(
        manager.getRepository(DocumentOperation),
        operations.map((o) => ({ operationId: o.id, documentId: createId })),
      );
      await this.createEntities(
        manager.getRepository(DocumentGrantor),
        grantors.map((g) => ({ grantorId: g.id, documentId: createId })),
      );
      await this.createEntities(
        manager.getRepository(DocumentGroup),
        groups.map((g) => ({ groupId: g.id, documentId: createId })),
      );
      // await this.createEntities(
      //   manager.getRepository(DocumentComment),
      //   documentComments.map((documentComment) => ({
      //     documentId: createId,
      //     comment: documentComment.comment,
      //     userId: (this.request.user as Users).id,
      //   })),
      // );
      await this.createEntities(
        manager.getRepository(DocumentAttachment),
        documentAttachments.map((da) => ({
          ...da,
          documentId: createId,
        })),
      );
      return createId;
    });
    return this.findOne(id);
  }

  async update(id: number, documentDto: UpdateDocumentDto) {
    await this._connection.transaction(async (manager) => {
      const {
        operations,
        grantors,
        groups,
        attachments,
        documentFiles,
        documentAttachments,
        ...document
      } = documentDto;

      await this.updateEntity(
        manager.getRepository(Documents),
        { ...document },
        id,
      );
      const updatedDocument = await this.findOne(id);
      await this.updateEntitiesByArrays(
        manager.getRepository(DocumentOperation),
        { columnName: 'documentId', id },
        { columnName: 'operationId' },
        updatedDocument.operations,
        operations,
      );
      await this.updateEntitiesByArrays(
        manager.getRepository(DocumentGrantor),
        { columnName: 'documentId', id },
        { columnName: 'grantorId' },
        updatedDocument.grantors,
        grantors,
      );
      await this.updateEntitiesByArrays(
        manager.getRepository(DocumentGroup),
        { columnName: 'documentId', id },
        { columnName: 'groupId' },
        updatedDocument.groups,
        groups,
      );
      await this.updateEntitiesByOneToMany(
        manager.getRepository(DocumentAttachment),
        { columnName: 'documentId', id },
        updatedDocument.documentAttachments,
        documentAttachments,
      );
      await this.updateEntitiesByOneToMany(
        manager.getRepository(DocumentFile),
        { columnName: 'documentId', id },
        updatedDocument.documentFiles,
        documentFiles,
      );
      // await this.updateEntitiesByOneToMany(
      //   manager.getRepository(DocumentComment),
      //   { columnName: 'documentId', id },
      //   updatedDocument.documentComments,
      //   documentComments.map((documentComment) => {
      //     return {
      //       ...documentComment,
      //       userId: (this.request.user as Users).id,
      //     };
      //   }),
      // );
    });
    return await this.findOne(id);
  }

  async paginate(
    params: DocumentPaginationQueryParamsDto,
  ): Promise<Pagination<Documents>> {
    const { itemsPerPage, page, search, year } = params;

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
      .getRepository(Documents)
      .createQueryBuilder('documents')
      .where('documents.active = 1')
      .leftJoinAndSelect(
        'documents.documentStatus',
        'documentStatuses',
        'documentStatuses.active = 1',
      )
      .leftJoinAndSelect(
        'documents.documentType',
        'documentTypes',
        'documentTypes.active = 1',
      )
      .leftJoinAndSelect(
        'documents.documentComments',
        'comments',
        'comments.active = 1',
      )
      .leftJoinAndSelect('comments.user', 'users', 'users.active = 1')
      .leftJoinAndSelect('documents.client', 'client', 'client.active = 1')
      .leftJoinAndSelect(
        'documents.groups',
        'groups',
        'documents_groups.active = 1',
      )
      .leftJoinAndSelect(
        'documents.documentAttachments',
        'documentAttachments',
        'documentAttachments.active = 1',
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('documents.folio LIKE :search', {
            search: `%${search}%`,
          })
            .orWhere('documents.tome LIKE :search', {
              search: `%${search}%`,
            })
            .orWhere('client.fullname LIKE :search', {
              search: `%${search}%`,
            })
            .orWhere('groups.name LIKE :search', {
              search: `%${search}%`,
            })
            .orWhere('documentTypes.name LIKE :search', {
              search: `%${search}%`,
            })
            .orWhere('documentStatuses.name LIKE :search', {
              search: `%${search}%`,
            });
        }),
      )
      .andWhere('documents.year = :year', {
        year: `${year}`,
      })
      .take(options.take)
      .skip(options.skip)
      .orderBy('documents.updatedAt', 'DESC')
      .getManyAndCount();

    return new Pagination<Documents>({
      results,
      total,
      itemsPerPage,
      page,
    });
  }

  async findOne(id: number) {
    return await this._connection
      .getRepository(Documents)
      .createQueryBuilder('documents')
      .leftJoinAndSelect(
        'documents.documentStatus',
        'documentStatuses',
        'documentStatuses.active = 1',
      )
      .leftJoinAndSelect(
        'documents.documentType',
        'documentTypes',
        'documentTypes.active = 1',
      )
      .leftJoinAndSelect(
        'documents.operations',
        'operations',
        'documents_operations.active = 1',
      )
      .leftJoinAndSelect(
        'documents.groups',
        'groups',
        'documents_groups.active = 1',
      )
      .leftJoinAndSelect(
        'documents.grantors',
        'grantors',
        'documents_grantors.active = 1',
      )
      .leftJoinAndSelect(
        'documents.documentAttachments',
        'documentAttachments',
        'documentAttachments.active = 1',
      )
      .leftJoinAndSelect(
        'documents.attachments',
        'attachments',
        'documents_attachments.active = 1',
      )
      .leftJoinAndSelect(
        'documents.documentComments',
        'comments',
        'comments.active = 1',
      )
      .leftJoinAndSelect(
        'documents.documentFiles',
        'documentFiles',
        'documentFiles.active = 1',
      )
      .leftJoinAndSelect('documents.client', 'clients', 'clients.active = 1')
      .where('documents.active = 1')
      .andWhere('documents.id = :id', { id })
      .getOne();
  }

  async remove(id: number) {
    const document = await this.findOne(id);
    await this._connection.transaction(async (manager) => {
      const document = await this.findOne(id);

      await this.updateEntitiesByArrays(
        manager.getRepository(DocumentGrantor),
        { columnName: 'documentId', id },
        { columnName: 'grantorId' },
        document.grantors,
        [],
      );

      await this.updateEntitiesByArrays(
        manager.getRepository(DocumentOperation),
        { columnName: 'documentId', id },
        { columnName: 'operationId' },
        document.operations,
        [],
      );

      await this.updateEntitiesByOneToMany(
        manager.getRepository(DocumentAttachment),
        { columnName: 'documentId', id },
        document.documentAttachments,
        [],
      );

      await this.updateEntitiesByArrays(
        manager.getRepository(DocumentGroup),
        { columnName: 'documentId', id },
        { columnName: 'groupId' },
        document.groups,
        [],
      );

      await this.updateEntitiesByOneToMany(
        manager.getRepository(DocumentComment),
        { columnName: 'documentId', id },
        document.documentComments,
        [],
      );

      return await manager
        .getRepository(Documents)
        .createQueryBuilder()
        .update()
        .set({
          active: -1,
        })
        .where('id = :id', { id })
        .execute();
    });
    return document;
  }

  async saveFiles(
    id: string,
    files: {
      originalName: string;
      fileName: string;
    }[],
  ) {
    await this._connection.transaction(async (manager) => {
      await this.createEntities(
        manager.getRepository(DocumentFile),
        files.map((da) => ({
          ...da,
          documentId: id,
        })),
      );
    });
  }

  async findComments(documentId: number) {
    return this._connection
      .getRepository(DocumentComment)
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.user', 'users', 'users.active = 1')
      .where('comments.documentId = :documentId', { documentId })
      .andWhere('comments.active = 1')
      .getMany();
  }

  async createDocumentComment(
    documentCommentDto: DocumentCommentDto,
    userId: number,
  ) {
    const createResult = await this.createEntity(
      this._connection.getRepository(DocumentComment),
      { ...documentCommentDto, userId },
    );

    const createId = createResult.identifiers[0].id;
    return this.getDocumentComment(createId);
  }

  async patchDocumentComment(
    documentCommentDto: DocumentCommentDto,
    documentCommentId: number,
  ) {
    await this.updateEntity(
      this._connection.getRepository(DocumentComment),
      { ...documentCommentDto },
      documentCommentId,
    );
    return await this.getDocumentComment(documentCommentId);
  }

  async getDocumentComment(documentCommentId: number) {
    return await this._connection
      .getRepository(DocumentComment)
      .createQueryBuilder()
      .where('id = :id', { id: documentCommentId })
      .andWhere('active = 1')
      .getOne();
  }

  async deleteDocumentComment(documentCommentId: number) {
    const documentComment = await this.getDocumentComment(documentCommentId);
    await this._connection
      .getRepository(DocumentComment)
      .createQueryBuilder()
      .update()
      .set({
        active: -1,
      })
      .where('id = :id', { id: documentCommentId })
      .execute();
    return documentComment;
  }
}
