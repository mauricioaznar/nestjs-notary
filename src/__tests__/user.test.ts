import { INestApplication } from '@nestjs/common';
import { setupApp } from './factories/setup-app';
import * as request from 'supertest';
import {
  getAdminToken,
  getLawyerToken,
  getSecretaryToken,
} from './factories/get-token';
import { group1, group2, group3 } from './objects/groups';
import { adminUser, user1 } from './objects/users';
import { Connection } from 'mysql2/promise';
import { getMysqlConnection } from './helpers/get-mysql-connection';
import { areEntitiesActiveMysql } from './helpers/are-entities-active-mysql';

describe('Users', () => {
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

  describe('user testing setup', () => {
    test('user1 contains group1 and is a lawyer', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${user1.id}`)
        .set(await getAdminToken(app));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.roleId).toBe(2);
      expect(response.body.groups).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: group1.id })]),
      );
    });

    test('user1 doesnt contain group2 or group3', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${user1.id}`)
        .set(await getAdminToken(app));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.groups).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: group2.id })]),
      );
      expect(response.body.groups).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: group3.id })]),
      );
    });

    test('admin doesnt contain group2 or group3 or group1', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${adminUser.id}`)
        .set(await getAdminToken(app));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.groups).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: group1.id })]),
      );
      expect(response.body.groups).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: group2.id })]),
      );
      expect(response.body.groups).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ id: group3.id })]),
      );
    });
  });

  describe('get user list', () => {
    test('allows any user to get user list', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set(await getSecretaryToken(app));

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.status).toBe(200);
    });

    test('forbids if a token is not set', async () => {
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.status).toBe(401);
    });
  });

  describe('register a user', () => {
    const user1Properties = {
      name: 'user name 1',
      lastname: 'lastname 1',
      email: 'registeremail@email.com',
      roleId: 1,
      groups: [group1],
      password: 'passwordasdfadsf',
    };

    it('allows a user to be created by an admin', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .set(await getAdminToken(app))
        .send({
          ...user1Properties,
        });

      expect(response.body.password).toBeUndefined();
      expect(response.body).toHaveProperty('id');
      expect(response.body.groups).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: group1.id })]),
      );
      expect(response.status).toBe(201);
    });

    for (const [key, value] of Object.entries(user1Properties)) {
      if (user1Properties.hasOwnProperty(key)) {
        const copyProperties = { ...user1Properties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const appointmentResponse = await request(app.getHttpServer())
            .post('/users')
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(appointmentResponse.status).toBe(400);
        });
      }
    }

    it('forbids a user to be created by a secretary', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .set(await getSecretaryToken(app))
        .send({
          ...user1Properties,
        });

      expect(response.status).toBe(403);
    });

    it('forbids a user to be created by a lawyer', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .set(await getLawyerToken(app))
        .send({
          ...user1Properties,
        });

      expect(response.status).toBe(403);
    });

    describe('email validation', () => {
      const user2Properties = {
        name: 'user name 1',
        lastname: 'lastname 1',
        email: 'emailfromusertwo@email.com',
        roleId: 1,
        groups: [group1],
        password: 'passwordasdfas',
      };
      beforeAll(async () => {
        await request(app.getHttpServer())
          .post('/users')
          .set(await getAdminToken(app))
          .send({
            ...user2Properties,
          });
      });

      it('forbids user with same email', async () => {
        const response = await request(app.getHttpServer())
          .post('/users')
          .set(await getAdminToken(app))
          .send({
            ...user2Properties,
          });

        expect(response.status).toBe(400);
      });
    });
  });

  describe('gets user', () => {
    const user1Properties = {
      name: 'user name 1',
      lastname: 'lastname 1',
      email: 'sernajsjsjsjsjm@email.com',
      roleId: 1,
      groups: [group3],
      password: 'passwordasdfas',
    };
    let user1;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .set(await getAdminToken(app))
        .send({
          ...user1Properties,
        });
      user1 = response.body;
    });

    it('gets user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${user1.id}`)
        .set(await getAdminToken(app));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.roleId).toBe(1);
      expect(response.body.groups).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: group3.id })]),
      );
      expect(response.body.password).toBeUndefined();
    });
  });

  describe('patches user', () => {
    const user1Properties = {
      name: 'user name 1',
      lastname: 'lastname 1',
      email: 'patch2323@email.com',
      roleId: 1,
      groups: [group1],
    };
    const user2Properties = {
      name: 'user name 1',
      lastname: 'lastname 1',
      email: 'patch2@email.com',
      roleId: 1,
      groups: [group1],
      password: 'asdfaasdfaa',
    };
    let user1;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .set(await getAdminToken(app))
        .send({
          ...user1Properties,
          password: 'somepassasdfa',
        });
      user1 = response.body;
      await request(app.getHttpServer())
        .post('/users')
        .set(await getAdminToken(app))
        .send({
          ...user2Properties,
        });
    });

    it('patches user without password', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/${user1.id}`)
        .set(await getAdminToken(app))
        .send({
          ...user1Properties,
          groups: [group3],
          name: 'name',
          email: 'newrandompatch@email.com',
        });
      expect(response.body.name).toEqual('name');
      expect(response.body.email).toEqual('newrandompatch@email.com');
      expect(response.body.groups).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: group3.id })]),
      );
      expect(response.status).toBe(200);
    });

    it('rejects patch for user using same email', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/${user1.id}`)
        .set(await getAdminToken(app))
        .send({
          ...user1Properties,
          email: user2Properties.email,
        });

      expect(response.status).toBe(400);
    });

    it('forbids a user to be patched by a lawyer', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/${user1.id}`)
        .set(await getLawyerToken(app))
        .send({
          ...user1Properties,
        });

      expect(response.status).toBe(403);
    });

    it('forbids a user to be patched by a secretary', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/${user1.id}`)
        .set(await getSecretaryToken(app))
        .send({
          ...user1Properties,
        });

      expect(response.status).toBe(403);
    });

    for (const [key, value] of Object.entries(user1Properties)) {
      if (user1Properties.hasOwnProperty(key)) {
        const copyProperties = { ...user1Properties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const appointmentResponse = await request(app.getHttpServer())
            .patch(`/users/${user1.id}`)
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(appointmentResponse.status).toBe(400);
        });
      }
    }
  });

  describe('removes user', () => {
    const user1Properties = {
      name: 'user name 1',
      lastname: 'lastname 1',
      email: 'remove@email.com',
      roleId: 1,
      groups: [group1],
      password: 'somepassasdf',
    };
    let user1;
    const user2Properties = {
      name: 'user name 1',
      lastname: 'lastname 1',
      email: 'remove2@email.com',
      roleId: 1,
      groups: [group1],
      password: 'somepassasdf',
    };
    let user2;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .set(await getAdminToken(app))
        .send({
          ...user1Properties,
        });
      user1 = response.body;

      const response2 = await request(app.getHttpServer())
        .post('/users')
        .set(await getAdminToken(app))
        .send({
          ...user2Properties,
        });
      user2 = response2.body;
    });

    it('returns not found after removal', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${user1.id}`)
        .set(await getAdminToken(app));

      const getResponse = await request(app.getHttpServer())
        .get(`/users/${user1.id}`)
        .set(await getAdminToken(app));

      expect(getResponse.status).toBe(404);

      const areGroupsActive = await areEntitiesActiveMysql(
        connection,
        'user_group',
        {
          hostColumnName: 'user_id',
          hostColumnId: user1.id,
          inverseColumnName: 'group_id',
        },
        user1.groups,
      );

      expect(areGroupsActive).toBe(false);
    });

    it('forbids a lawyer user to remove a user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/${user2.id}`)
        .set(await getLawyerToken(app));

      expect(response.status).toBe(403);
    });
  });
});
