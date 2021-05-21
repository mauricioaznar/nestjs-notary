import { INestApplication } from '@nestjs/common';
import { setupApp } from './factories/setup-app';
import * as request from 'supertest';
import { getAdminToken, getSecretaryToken } from './factories/get-token';
import { grantor1, grantor2, grantor3 } from './objects/grantors';
import { Connection } from 'mysql2/promise';
import { getMysqlConnection } from './helpers/get-mysql-connection';
import { areEntitiesActiveMysql } from './helpers/are-entities-active-mysql';

describe('Clients', () => {
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

  describe('get client list', () => {
    test('allows any user to get client list', async () => {
      const response = await request(app.getHttpServer())
        .get('/clients')
        .set(await getSecretaryToken(app));

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.status).toBe(200);
    });

    test('forbids to get a list without a valid token', async () => {
      const response = await request(app.getHttpServer()).get('/clients');

      expect(response.status).toBe(401);
    });
  });

  describe('register a client', () => {
    const client1Properties = {
      name: 'client name 1',
      lastname: 'client lastname 1',
      grantors: [grantor1, grantor3],
    };

    it('allows a client to be created by an admin', async () => {
      const response = await request(app.getHttpServer())
        .post('/clients')
        .set(await getAdminToken(app))
        .send({
          ...client1Properties,
        });
      expect(response.body).toHaveProperty('id');
      expect(response.status).toBe(201);
    });

    for (const [key, value] of Object.entries(client1Properties)) {
      if (client1Properties.hasOwnProperty(key)) {
        const copyProperties = { ...client1Properties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const response = await request(app.getHttpServer())
            .post('/clients')
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(response.status).toBe(400);
        });
      }
    }
  });

  describe('gets client', () => {
    const client1Properties = {
      name: 'client name 1',
      lastname: 'client lastname 1',
      grantors: [grantor1, grantor3],
    };
    let clientOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/clients')
        .set(await getAdminToken(app))
        .send({
          ...client1Properties,
        });
      clientOne = response.body;
    });

    it('returns a client', async () => {
      const response = await request(app.getHttpServer())
        .get(`/clients/${clientOne.id}`)
        .set(await getAdminToken(app));

      expect(response.body).toHaveProperty('id');
      expect(response.body.grantors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: grantor1.id }),
          expect.objectContaining({ id: grantor3.id }),
        ]),
      );
      expect(response.status).toBe(200);
    });
  });

  describe('patches client', () => {
    const client1Properties = {
      name: 'client name 1',
      lastname: 'client lastname 1',
      grantors: [grantor1, grantor3],
    };
    let clientOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/clients')
        .set(await getAdminToken(app))
        .send({
          ...client1Properties,
        });
      clientOne = response.body;
    });

    it('patches client', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/clients/${clientOne.id}`)
        .set(await getAdminToken(app))
        .send({
          ...client1Properties,
          name: 'name',
          grantors: [grantor2],
        });

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toEqual('name');
      expect(response.body.grantors).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: grantor2.id })]),
      );
      expect(response.status).toBe(200);
    });

    for (const [key, value] of Object.entries(client1Properties)) {
      if (client1Properties.hasOwnProperty(key)) {
        const copyProperties = { ...client1Properties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const response = await request(app.getHttpServer())
            .patch(`/clients/${clientOne.id}`)
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(response.status).toBe(400);
        });
      }
    }
  });

  describe('removes client', () => {
    const client1properties = {
      name: 'name 1',
      lastname: 'client lastname 1',
      grantors: [grantor1, grantor3],
    };
    let clientOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/clients')
        .set(await getAdminToken(app))
        .send({
          ...client1properties,
        });
      clientOne = response.body;
    });

    it('returns not found after removal', async () => {
      await request(app.getHttpServer())
        .delete(`/clients/${clientOne.id}`)
        .set(await getAdminToken(app));

      const getResponse = await request(app.getHttpServer())
        .get(`/clients/${clientOne.id}`)
        .set(await getAdminToken(app));

      expect(getResponse.status).toBe(404);

      const areGrantorsActive = await areEntitiesActiveMysql(
        connection,
        'client_grantor',
        {
          hostColumnName: 'client_id',
          hostColumnId: clientOne.id,
          inverseColumnName: 'grantor_id',
        },
        clientOne.grantors,
      );

      expect(areGrantorsActive).toBe(false);
    });
  });
});
