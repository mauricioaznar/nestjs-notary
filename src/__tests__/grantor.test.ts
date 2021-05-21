import { INestApplication } from '@nestjs/common';
import { setupApp } from './factories/setup-app';
import * as request from 'supertest';
import { getAdminToken, getSecretaryToken } from './factories/get-token';
import { client1, client2, client3 } from './objects/clients';
import { Connection } from 'mysql2/promise';
import { getMysqlConnection } from './helpers/get-mysql-connection';
import { areEntitiesActiveMysql } from './helpers/are-entities-active-mysql';

describe('Grantors', () => {
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

  describe('get grantors list', () => {
    test('allows any user to get grantor list', async () => {
      const response = await request(app.getHttpServer())
        .get('/grantors')
        .set(await getSecretaryToken(app));

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.status).toBe(200);
    });

    test('forbids to get a list without a valid token', async () => {
      const response = await request(app.getHttpServer()).get('/grantors');

      expect(response.status).toBe(401);
    });
  });

  describe('register a grantor', () => {
    const grantor1Properties = {
      name: 'name',
      lastname: 'grantor lastname 1',
      clients: [client1, client2],
    };

    it('allows a grantor to be created by an admin', async () => {
      const response = await request(app.getHttpServer())
        .post('/grantors')
        .set(await getAdminToken(app))
        .send({
          ...grantor1Properties,
        });
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toEqual('name');
      expect(response.status).toBe(201);
    });

    for (const [key, value] of Object.entries(grantor1Properties)) {
      if (grantor1Properties.hasOwnProperty(key)) {
        const copyProperties = { ...grantor1Properties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const response = await request(app.getHttpServer())
            .post('/grantors')
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(response.status).toBe(400);
        });
      }
    }
  });

  describe('gets grantor', () => {
    const grantor1Properties = {
      name: 'garntor name 1',
      lastname: 'grantor lastname 1',
      clients: [client1, client2],
    };
    let grantorOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/grantors')
        .set(await getAdminToken(app))
        .send({
          ...grantor1Properties,
        });
      grantorOne = response.body;
    });

    it('returns a grantor', async () => {
      const response = await request(app.getHttpServer())
        .get(`/grantors/${grantorOne.id}`)
        .set(await getAdminToken(app));

      expect(response.body).toHaveProperty('id');
      expect(response.status).toBe(200);
    });

    it('returns a grantor with a client', async () => {
      const response = await request(app.getHttpServer())
        .get(`/grantors/${grantorOne.id}`)
        .set(await getAdminToken(app));

      expect(response.body).toHaveProperty('id');
      expect(response.body.clients).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: client1.id }),
          expect.objectContaining({ id: client2.id }),
        ]),
      );
      expect(response.status).toBe(200);
    });
  });

  describe('patches grantor', () => {
    const grantor1Properties = {
      name: 'garntor name 1',
      lastname: 'grantor lastname 1',
      clients: [client1, client2],
    };
    let grantorOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/grantors')
        .set(await getAdminToken(app))
        .send({
          ...grantor1Properties,
        });
      grantorOne = response.body;
    });

    it('patches grantor', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/grantors/${grantorOne.id}`)
        .set(await getAdminToken(app))
        .send({
          ...grantor1Properties,
          name: 'name',
          clients: [client3],
        });

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toEqual('name');
      expect(response.body.clients).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: client3.id })]),
      );
      expect(response.status).toBe(200);
    });

    for (const [key, value] of Object.entries(grantor1Properties)) {
      if (grantor1Properties.hasOwnProperty(key)) {
        const copyProperties = { ...grantor1Properties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const response = await request(app.getHttpServer())
            .patch(`/grantors/${grantorOne.id}`)
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(response.status).toBe(400);
        });
      }
    }
  });

  describe('removes grantor', () => {
    const grantor1Properties = {
      name: 'garntor name 1',
      lastname: 'grantor lastname 1',
      clients: [client1, client2],
    };
    let grantorOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/grantors')
        .set(await getAdminToken(app))
        .send({
          ...grantor1Properties,
        });
      grantorOne = response.body;
    });

    it('returns not found after removal', async () => {
      await request(app.getHttpServer())
        .delete(`/grantors/${grantorOne.id}`)
        .set(await getAdminToken(app));

      const getResponse = await request(app.getHttpServer())
        .get(`/grantors/${grantorOne.id}`)
        .set(await getAdminToken(app));

      expect(getResponse.status).toBe(404);

      const areClientsActive = await areEntitiesActiveMysql(
        connection,
        'client_grantor',
        {
          hostColumnName: 'grantor_id',
          hostColumnId: grantorOne.id,
          inverseColumnName: 'client_id',
        },
        grantorOne.clients,
      );

      expect(areClientsActive).toBe(false);
    });
  });
});
