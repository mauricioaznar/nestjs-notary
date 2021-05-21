import { INestApplication } from '@nestjs/common';
import { setupApp } from './factories/setup-app';
import * as request from 'supertest';
import {
  getAdminToken,
  getLawyerToken,
  getSecretaryToken,
} from './factories/get-token';
import { adminUser, lawyerUser, secretaryUser } from './objects/users';
import { Connection } from 'mysql2/promise';
import { getMysqlConnection } from './helpers/get-mysql-connection';
import { areEntitiesActiveMysql } from './helpers/are-entities-active-mysql';

describe('Groups', () => {
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

  describe('get group list', () => {
    test('allows any user to get group list', async () => {
      const response = await request(app.getHttpServer())
        .get('/groups')
        .set(await getSecretaryToken(app));

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.status).toBe(200);
    });

    test('forbids if a token is not set', async () => {
      const response = await request(app.getHttpServer()).get('/groups');
      expect(response.status).toBe(401);
    });
  });

  describe('register a group', () => {
    const group1Properties = {
      name: 'group name 1',
      users: [adminUser, lawyerUser],
      userId: adminUser.id,
    };

    it('allows a group to be created by an admin', async () => {
      const response = await request(app.getHttpServer())
        .post('/groups')
        .set(await getAdminToken(app))
        .send({
          ...group1Properties,
        });

      expect(response.body.name).toEqual('group name 1');
      expect(response.body.users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: adminUser.id }),
          expect.objectContaining({ id: lawyerUser.id }),
        ]),
      );
      expect(response.body.userId).toEqual(adminUser.id);
      expect(response.status).toBe(201);
    });

    for (const [key, value] of Object.entries(group1Properties)) {
      if (group1Properties.hasOwnProperty(key)) {
        const copyProperties = { ...group1Properties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const response = await request(app.getHttpServer())
            .post('/groups')
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(response.status).toBe(400);
        });
      }
    }

    it('forbids when a group  created by a secretary', async () => {
      const response = await request(app.getHttpServer())
        .post('/groups')
        .set(await getSecretaryToken(app))
        .send({
          ...group1Properties,
        });

      expect(response.status).toBe(403);
    });

    it('forbids when a group is created by a lawyer', async () => {
      const response = await request(app.getHttpServer())
        .post('/groups')
        .set(await getLawyerToken(app))
        .send({
          ...group1Properties,
        });

      expect(response.status).toBe(403);
    });
  });

  describe('gets group', () => {
    const group1properties = {
      name: 'group name 1',
      users: [adminUser, secretaryUser],
      userId: adminUser.id,
    };
    let groupOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/groups')
        .set(await getAdminToken(app))
        .send({
          ...group1properties,
        });
      groupOne = response.body;
    });

    it('gets group', async () => {
      const response = await request(app.getHttpServer())
        .get(`/groups/${groupOne.id}`)
        .set(await getAdminToken(app));

      expect(response.status).toBe(200);
      expect(response.body.name).toEqual('group name 1');
      expect(response.body).toHaveProperty('id');
    });

    it('contains adminUser and secretaryUser', async () => {
      const response = await request(app.getHttpServer())
        .get(`/groups/${groupOne.id}`)
        .set(await getAdminToken(app));

      expect(response.status).toBe(200);
      expect(response.body.users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: adminUser.id }),
          expect.objectContaining({ id: secretaryUser.id }),
        ]),
      );
    });
  });

  describe('patches group', () => {
    const group1properties = {
      name: 'user name 1',
      users: [adminUser],
      userId: adminUser.id,
    };
    let groupOne;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/groups')
        .set(await getAdminToken(app))
        .send({
          ...group1properties,
        });
      groupOne = response.body;
    });

    it('patches group', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/groups/${groupOne.id}`)
        .set(await getAdminToken(app))
        .send({
          ...group1properties,
          userId: lawyerUser.id,
          users: [lawyerUser],
          name: 'name',
        });
      expect(response.body.users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: lawyerUser.id }),
        ]),
      );
      expect(response.body.userId).toEqual(lawyerUser.id);
      expect(response.body.name).toEqual('name');
      expect(response.status).toBe(200);
    });

    it('forbids when a group is patched by a lawyer', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/users/${groupOne.id}`)
        .set(await getLawyerToken(app))
        .send({
          ...group1properties,
        });

      expect(response.status).toBe(403);
    });

    for (const [key, value] of Object.entries(group1properties)) {
      if (group1properties.hasOwnProperty(key)) {
        const copyProperties = { ...group1properties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const response = await request(app.getHttpServer())
            .patch(`/groups/${groupOne.id}`)
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(response.status).toBe(400);
        });
      }
    }
  });

  describe('removes group', () => {
    const group1properties = {
      name: 'group 1',
      users: [adminUser],
      userId: adminUser.id,
    };
    let groupOne;
    const group2properties = {
      name: 'group 2',
      users: [adminUser],
      userId: adminUser.id,
    };
    let groupTwo;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/groups')
        .set(await getAdminToken(app))
        .send({
          ...group1properties,
        });
      groupOne = response.body;

      const response2 = await request(app.getHttpServer())
        .post('/groups')
        .set(await getAdminToken(app))
        .send({
          ...group2properties,
        });
      groupTwo = response2.body;
    });

    it('returns not found after removal', async () => {
      await request(app.getHttpServer())
        .delete(`/groups/${groupOne.id}`)
        .set(await getAdminToken(app));

      const getResponse = await request(app.getHttpServer())
        .get(`/groups/${groupOne.id}`)
        .set(await getAdminToken(app));

      expect(getResponse.status).toBe(404);

      const areUsersActive = await areEntitiesActiveMysql(
        connection,
        'user_group',
        {
          hostColumnName: 'group_id',
          hostColumnId: groupOne.id,
          inverseColumnName: 'user_id',
        },
        groupOne.users,
      );

      expect(areUsersActive).toBe(false);
    });

    it('forbids a lawyer user to remove a group', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/groups/${groupTwo.id}`)
        .set(await getLawyerToken(app));

      expect(response.status).toBe(403);
    });
  });
});
