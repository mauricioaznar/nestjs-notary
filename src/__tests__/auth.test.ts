import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { adminUser } from './objects/users';
import { setupApp } from './factories/setup-app';
import {
  getAdminToken,
  getLawyerToken,
  getSecretaryToken,
} from './factories/get-token';
import { group1 } from './objects/groups';

describe('App', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await setupApp();
  });

  it('logs in with a valid user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        password: adminUser.password,
        email: adminUser.email,
      });

    expect(response.status).toBe(201);
    expect(response.body.access_token).toBeDefined();
  });

  it('rejects invalid user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        password: 'invalid',
        email: 'invalid@email.com',
      });

    expect(response.status).toBe(401);
  });

  describe('reset token', () => {
    let user;
    let user2;
    beforeAll(async () => {
      const user1Properties = {
        name: 'user name 1',
        lastname: 'lastname 1',
        email: 'auth_change_password@email.com',
        roleId: 1,
        groups: [group1],
      };
      const userResponse = await request(app.getHttpServer())
        .post('/users')
        .set(await getAdminToken(app))
        .send({
          ...user1Properties,
          password: 'somepassasdfa',
        });
      user = userResponse.body;
    });

    it('generate reset password token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/generate_reset_token')
        .set(await getAdminToken(app))
        .send({
          userId: user.id,
        });

      expect(response.body.reset_token).toBeDefined();
      expect(response.status).toBe(201);
    });

    it('forbids a secretary to generate reset password token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/generate_reset_token')
        .set(await getSecretaryToken(app))
        .send({
          userId: user.id,
        });

      expect(response.status).toBe(403);
    });

    it('forbids a lawyer to generate reset password token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/generate_reset_token')
        .set(await getLawyerToken(app))
        .send({
          userId: user.id,
        });

      expect(response.status).toBe(403);
    });

    it('get reset password token and validates it', async () => {
      const generateTokenResponse = await request(app.getHttpServer())
        .post('/auth/generate_reset_token')
        .set(await getAdminToken(app))
        .send({
          userId: user.id,
        });

      const reset_token = generateTokenResponse.body.reset_token;

      const response = await request(app.getHttpServer()).get(
        `/auth/validate_reset_token/${reset_token}`,
      );

      expect(response.body.isValid).toBe(true);
      expect(response.status).toBe(200);
    });

    it('returns false when is not valid', async () => {
      const response = await request(app.getHttpServer()).get(
        `/auth/validate_reset_token/${'asdfasdf'}`,
      );
      expect(response.body.isValid).toBe(false);
      expect(response.status).toBe(200);
    });

    it('changes password', async () => {
      const user2Properties = {
        name: 'user name 1',
        lastname: 'lastname 1',
        email: 'auth_change_password2@email.com',
        roleId: 1,
        groups: [group1],
      };

      const user2Response = await request(app.getHttpServer())
        .post('/users')
        .set(await getAdminToken(app))
        .send({
          ...user2Properties,
          password: 'somepassasdfa',
        });
      user2 = user2Response.body;

      const generateTokenResponse = await request(app.getHttpServer())
        .post('/auth/generate_reset_token')
        .set(await getAdminToken(app))
        .send({
          userId: user2.id,
        });

      const reset_token = generateTokenResponse.body.reset_token;

      const changePasswordResponse = await request(app.getHttpServer())
        .post(`/auth/change_password/${reset_token}`)
        .send({
          password: 'asdfahasdkjfkjlh',
        });

      expect(changePasswordResponse.status).toBe(201);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          password: 'asdfahasdkjfkjlh',
          email: user2Properties.email,
        });

      expect(loginResponse.status).toBe(201);
    });
  });
});
