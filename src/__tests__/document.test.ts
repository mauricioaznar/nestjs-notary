import { INestApplication } from '@nestjs/common';
import { setupApp } from './factories/setup-app';
import * as request from 'supertest';
import {
  getAdminToken,
  getSecretaryToken,
  getUser1Token,
} from './factories/get-token';
import { grantor1, grantor2, grantor3 } from './objects/grantors';
import { adminUser, lawyerUser, secretaryUser } from './objects/users';
import { client1, client2 } from './objects/clients';
import { pendingStatus, registryStatus } from './objects/documentStatuses';
import { operation1, operation2 } from './objects/operations';
import { attachment1, attachment2 } from './objects/attachments';
import { group1, group2 } from './objects/groups';
import { documentType1, documentType2 } from './objects/documentTypes';
import { Connection } from 'mysql2/promise';
import { getMysqlConnection } from './helpers/get-mysql-connection';
import { areEntitiesActiveMysql } from './helpers/are-entities-active-mysql';
import { areRelationsActiveMysql } from './helpers/are-relations-active-mysql';

const documentProperties = {
  publicRegistryEntryDate: '2020-01-02',
  publicRegistryExitDate: '2020-01-03',
  fileNumber: '1',
  moneyLaundering: 0,
  documentStatusId: pendingStatus.id,
  clientId: client1.id,
  operations: [operation1],
  grantors: [grantor1],
  groups: [group1],
  attachments: [attachment1],
  entryUsers: [adminUser],
  closureUsers: [secretaryUser],
  documentTypeId: documentType1.id,
  documentAttachments: [{ attachmentId: attachment1.id, attachmentStatus: 0 }],
  documentComments: [{ comment: 'this is a comment' }],
};

describe('Documents', () => {
  let app: INestApplication;

  let connection: Connection;

  beforeAll(async () => {
    connection = await getMysqlConnection();
  });

  afterAll(async () => {
    await connection.end();
  });

  beforeEach(async () => {
    app = await setupApp();
  });

  describe('get document list', () => {
    test('forbids if pagination params are not correct', async () => {
      const response = await request(app.getHttpServer())
        .get('/documents/pagination')
        .query({
          itemsPerPage: 10,
        })
        .set(await getSecretaryToken(app));

      expect(response.status).toBe(400);
      expect(response.body.message.length).toBeGreaterThan(0);
    });

    test('allows any user to get document list', async () => {
      const response = await request(app.getHttpServer())
        .get('/documents/pagination')
        .query({
          page: 1,
          itemsPerPage: 10,
          year: '2020',
        })
        .set(await getSecretaryToken(app));

      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.results).toBeInstanceOf(Array);
      expect(response.status).toBe(200);
    });

    test('fails when year is not defined', async () => {
      const response = await request(app.getHttpServer())
        .get('/documents/pagination')
        .query({
          page: 1,
          itemsPerPage: 10,
        })
        .set(await getSecretaryToken(app));

      expect(response.status).toBe(400);
      expect(response.body.message.length).toBeGreaterThan(0);
    });

    test('forbids to get a list without a valid token', async () => {
      const response = await request(app.getHttpServer())
        .get('/documents/pagination')
        .query({
          page: 1,
          itemsPerPage: 10,
        });

      expect(response.status).toBe(401);
    });
  });

  describe('register a document', () => {
    const document1Properties = {
      ...documentProperties,
      folio: 1,
      date: '2020-01-01',
      tome: '1',
    };

    it('allows a document to be created by an admin', async () => {
      const response = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
        });

      expect(response.body).toHaveProperty('id');
      expect(response.status).toBe(201);
    });

    it('doesnt register a document when folio, and tome are the same', async () => {
      const newFolioDateTome = {
        folio: 2,
        date: '2020-01-01',
        tome: '1-2',
      };
      const postResponse = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
          ...newFolioDateTome,
        });

      expect(postResponse.status).toBe(201);

      const response = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
          ...newFolioDateTome,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('tome');
      expect(response.body.message).toContain('folio');
    });

    it('doesnt register a attachment is not part of the same document type', async () => {
      // see setup documents for more information

      const postResponse = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
          folio: 2,
          date: '2020-01-01',
          tome: '1-3',
          documentTypeId: documentType1.id,
          attachments: [attachment2],
          documentAttachments: [
            { attachmentId: attachment2.id, attachmentStatus: 0 },
          ],
        });

      expect(postResponse.body).toHaveProperty('message');
      expect(postResponse.status).toBe(400);
    });

    it('doesnt register a attachment when doesnt match document attachments', async () => {
      // see setup documents for more information

      const postResponse = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
          folio: 2,
          date: '2020-01-01',
          tome: '1-3',
          documentTypeId: documentType1.id,
          attachments: [attachment1],
          documentAttachments: [],
        });

      expect(postResponse.body).toHaveProperty('message');
      expect(postResponse.status).toBe(400);
    });

    test('forbids to post a document without a valid token', async () => {
      const response = await request(app.getHttpServer())
        .post('/documents')
        .send({
          ...document1Properties,
        });

      expect(response.status).toBe(401);
    });

    it('doesnt register a operation is not part of the same document type', async () => {
      // see setup documents for more information

      const postResponse = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
          folio: 2,
          date: '2020-01-01',
          tome: '1-4',
          documentTypeId: documentType1.id,
          operations: [operation2],
        });

      expect(postResponse.body).toHaveProperty('message');
      expect(postResponse.status).toBe(400);
    });

    test('forbids to post a document without a valid token', async () => {
      const response = await request(app.getHttpServer())
        .post('/documents')
        .send({
          ...document1Properties,
        });

      expect(response.status).toBe(401);
    });

    for (const [key, value] of Object.entries(document1Properties)) {
      if (document1Properties.hasOwnProperty(key)) {
        const copyProperties = { ...document1Properties, tome: '1-4' };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const response = await request(app.getHttpServer())
            .post('/documents')
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(response.status).toBe(400);
        });
      }
    }
  });

  describe('gets document', () => {
    const document1Properties = {
      ...documentProperties,
      folio: 3,
      date: '2021-02-01',
      tome: '2-1',
    };
    let documentOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
        });
      documentOne = response.body;
    });

    it('returns a document', async () => {
      const response = await request(app.getHttpServer())
        .get(`/documents/${documentOne.id}`)
        .set(await getAdminToken(app));

      expect(response.body).toHaveProperty('id');
      expect(response.body.folio).toEqual('3');
      expect(response.body.date).toEqual('2021-02-01');
      expect(response.body.tome).toEqual('2-1');
      expect(response.body.fileNumber).toEqual('1');
      expect(response.body.operations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: operation1.id }),
        ]),
      );
      expect(response.body.grantors).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: grantor1.id })]),
      );
      expect(response.body.moneyLaundering).toEqual(0);
      expect(response.body.documentStatusId).toEqual(pendingStatus.id);
      expect(response.body.clientId).toEqual(client1.id);
      expect(response.body.documentTypeId).toEqual(documentType1.id);
      expect(response.body.documentAttachments).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            attachmentId: attachment1.id,
            attachmentStatus: 0,
          }),
        ]),
      );
      expect(response.body.documentComments).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ comment: 'this is a comment' }),
        ]),
      );
      expect(response.body.attachments).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: attachment1.id }),
        ]),
      );
      expect(response.body.entryUsers).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: adminUser.id })]),
      );
      expect(response.body.closureUsers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: secretaryUser.id }),
        ]),
      );
      expect(response.status).toBe(200);
    });

    test('forbids to get a document without a valid token', async () => {
      const response = await request(app.getHttpServer()).get(
        `/documents/${documentOne.id}`,
      );

      expect(response.status).toBe(401);
    });
  });

  describe('patches document', () => {
    const document1Properties = {
      ...documentProperties,
      folio: 4,
      date: '2022-03-01',
      tome: '3-1',
    };
    let documentOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
        });
      documentOne = response.body;
    });

    it('allows to patch with the same properties', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/documents/${documentOne.id}`)
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
        });

      expect(response.status).toBe(200);
    });

    it('forbids to patch folio more than 400', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/documents/${documentOne.id}`)
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
          folio: 401,
        });

      expect(response.status).toBe(400);
    });

    it('forbids to patch folio when is less than 1', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/documents/${documentOne.id}`)
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
          folio: 0,
        });

      expect(response.status).toBe(400);
    });

    it('forbids to patch tome when doesnt have correct format', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/documents/${documentOne.id}`)
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
          tome: '3/1',
        });

      expect(response.status).toBe(400);
    });

    test('forbids to get a document without a valid token', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/documents/${documentOne.id}`)
        .send({
          ...document1Properties,
        });

      expect(response.status).toBe(401);
    });

    test('forbids to patch a document without belonging to a group', async () => {
      const patchDocumentProperties = {
        ...documentProperties,
        folio: 11,
        date: '2025-01-01',
        tome: '3-3',
        groups: [group2],
      };

      const postResponse = await request(app.getHttpServer())
        .post(`/documents`)
        .set(await getAdminToken(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(postResponse.status).toBe(201);

      const postDocument = postResponse.body;

      const response = await request(app.getHttpServer())
        .patch(`/documents/${postDocument.id}`)
        .set(await getUser1Token(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(response.status).toBe(403);
    });

    test('allows to patch a document when belonging to a group', async () => {
      const patchDocumentProperties = {
        ...documentProperties,
        folio: 12,
        date: '2025-01-01',
        tome: '3-5',
        groups: [group1],
      };

      const postResponse = await request(app.getHttpServer())
        .post(`/documents`)
        .set(await getAdminToken(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(postResponse.status).toBe(201);

      const postDocument = postResponse.body;

      const response = await request(app.getHttpServer())
        .patch(`/documents/${postDocument.id}`)
        .set(await getUser1Token(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(response.status).toBe(200);
    });

    test('allows to patch a document when user is admin', async () => {
      const patchDocumentProperties = {
        ...documentProperties,
        folio: 20,
        date: '2025-01-01',
        tome: '3-6',
        groups: [group1],
      };

      const postResponse = await request(app.getHttpServer())
        .post(`/documents`)
        .set(await getAdminToken(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(postResponse.status).toBe(201);

      const postDocument = postResponse.body;

      const response = await request(app.getHttpServer())
        .patch(`/documents/${postDocument.id}`)
        .set(await getAdminToken(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(response.status).toBe(200);
    });

    it('allow to patch when folio, tome, and date are occupied by the same document', async () => {
      const patchDocumentProperties = {
        ...documentProperties,
        folio: 7,
        date: '2026-01-01',
        tome: '3-7',
      };

      const postResponse = await request(app.getHttpServer())
        .post(`/documents`)
        .set(await getAdminToken(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(postResponse.status).toBe(201);

      const postDocument = postResponse.body;

      const response = await request(app.getHttpServer())
        .patch(`/documents/${postDocument.id}`)
        .set(await getAdminToken(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(response.status).toBe(200);
    });

    it('forbids to patch when folio, tome, and date are already occupied', async () => {
      const patchDocumentProperties = {
        ...documentProperties,
        folio: 5,
        date: '2022-01-01',
        tome: '3-8',
      };

      const postResponse = await request(app.getHttpServer())
        .post(`/documents`)
        .set(await getAdminToken(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(postResponse.status).toBe(201);

      const response = await request(app.getHttpServer())
        .patch(`/documents/${documentOne.id}`)
        .set(await getAdminToken(app))
        .send({
          ...patchDocumentProperties,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('tome');
      expect(response.body.message).toContain('folio');
    });

    it('patches document', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/documents/${documentOne.id}`)
        .set(await getAdminToken(app))
        .send({
          folio: 8,
          date: '2022-04-01',
          tome: '3-9',
          fileNumber: '2',
          publicRegistryEntryDate: '2020-01-02',
          publicRegistryExitDate: '2020-01-03',
          moneyLaundering: 1,
          documentStatusId: registryStatus.id,
          clientId: client2.id,
          operations: [operation2],
          grantors: [grantor2],
          groups: [group2],
          attachments: [attachment2],
          entryUsers: [secretaryUser],
          closureUsers: [adminUser],
          documentTypeId: documentType2.id,
          documentAttachments: [
            { attachmentId: attachment2.id, attachmentStatus: 1 },
          ],
          documentComments: [{ comment: 'this is a comment 2' }],
        });

      expect(response.body).toHaveProperty('id');
      expect(response.body.grantors).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: grantor2.id })]),
      );
      expect(response.body.operations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: operation2.id }),
        ]),
      );
      expect(response.body.folio).toEqual('8');
      expect(response.body.date).toEqual('2022-04-01');
      expect(response.body.tome).toEqual('3-9');
      expect(response.body.publicRegistryEntryDate).toEqual('2020-01-02');
      expect(response.body.publicRegistryExitDate).toEqual('2020-01-03');
      expect(response.body.fileNumber).toEqual('2');
      expect(response.body.moneyLaundering).toEqual(1);
      expect(response.body.documentStatusId).toEqual(registryStatus.id);
      expect(response.body.clientId).toEqual(client2.id);
      expect(response.body.documentTypeId).toEqual(documentType2.id);
      expect(response.body.documentAttachments).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            attachmentId: attachment2.id,
            attachmentStatus: 1,
          }),
        ]),
      );
      expect(response.body.documentComments).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ comment: 'this is a comment 2' }),
        ]),
      );
      expect(response.body.attachments).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: attachment2.id }),
        ]),
      );
      expect(response.body.entryUsers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: secretaryUser.id }),
        ]),
      );
      expect(response.body.closureUsers).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: adminUser.id })]),
      );
      expect(response.status).toBe(200);
    });

    for (const [key, value] of Object.entries(document1Properties)) {
      if (document1Properties.hasOwnProperty(key)) {
        const copyProperties = { ...document1Properties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const response = await request(app.getHttpServer())
            .patch(`/documents/${documentOne.id}`)
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(response.status).toBe(400);
        });
      }
    }
  });

  describe('removes document', () => {
    const document1Properties = {
      ...documentProperties,
      folio: 6,
      date: '2023-03-01',
      tome: '4-1',
    };
    let documentOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document1Properties,
        });
      documentOne = response.body;
    });

    it('returns not found after removal', async () => {
      await request(app.getHttpServer())
        .delete(`/documents/${documentOne.id}`)
        .set(await getAdminToken(app));

      const getResponse = await request(app.getHttpServer())
        .get(`/documents/${documentOne.id}`)
        .set(await getAdminToken(app));

      expect(getResponse.status).toBe(404);

      const areGrantorsActive = await areEntitiesActiveMysql(
        connection,
        'document_grantor',
        {
          hostColumnName: 'document_id',
          hostColumnId: documentOne.id,
          inverseColumnName: 'grantor_id',
        },
        documentOne.grantors,
      );

      expect(areGrantorsActive).toBe(false);

      const areOperationsActive = await areEntitiesActiveMysql(
        connection,
        'document_operation',
        {
          hostColumnName: 'document_id',
          hostColumnId: documentOne.id,
          inverseColumnName: 'operation_id',
        },
        documentOne.operations,
      );

      expect(areOperationsActive).toBe(false);

      const areAttachmentsActive = await areRelationsActiveMysql(
        connection,
        'document_attachment',
        documentOne.documentAttachments,
      );

      expect(areAttachmentsActive).toBe(false);

      const areGroupsActive = await areEntitiesActiveMysql(
        connection,
        'document_group',
        {
          hostColumnName: 'document_id',
          hostColumnId: documentOne.id,
          inverseColumnName: 'group_id',
        },
        documentOne.groups,
      );

      expect(areGroupsActive).toBe(false);

      const areEntryUsersActive = await areEntitiesActiveMysql(
        connection,
        'document_user',
        {
          hostColumnName: 'document_id',
          hostColumnId: documentOne.id,
          inverseColumnName: 'user_id',
          extraProperties: { entry_lawyer: 1, closure_lawyer: 0 },
        },
        documentOne.entryUsers,
      );

      expect(areEntryUsersActive).toBe(false);

      const areClosureUsersActive = await areEntitiesActiveMysql(
        connection,
        'document_user',
        {
          hostColumnName: 'document_id',
          hostColumnId: documentOne.id,
          inverseColumnName: 'user_id',
          extraProperties: { entry_lawyer: 0, closure_lawyer: 1 },
        },
        documentOne.closureUsers,
      );

      expect(areClosureUsersActive).toBe(false);

      const areDocumentCommentsActive = await areRelationsActiveMysql(
        connection,
        'document_comment',
        documentOne.documentComments,
      );

      expect(areDocumentCommentsActive).toBe(false);
    });

    test('forbids to remove a document without a valid token', async () => {
      const document2Properties = {
        ...documentProperties,
        folio: 7,
        date: '2023-03-01',
        tome: '4-2',
      };
      const postResponse = await request(app.getHttpServer())
        .post('/documents')
        .set(await getAdminToken(app))
        .send({
          ...document2Properties,
        });

      expect(postResponse.status).toBe(201);

      const documentTwo = postResponse.body;

      const response = await request(app.getHttpServer()).delete(
        `/documents/${documentTwo.id}`,
      );

      expect(response.status).toBe(401);
    });
  });
});
