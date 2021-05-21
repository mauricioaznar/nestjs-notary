import * as request from 'supertest';
import { adminUser, lawyerUser, secretaryUser, user1 } from '../objects/users';
import { INestApplication } from '@nestjs/common';

export async function getAdminToken(app: INestApplication) {
  const response = await request(app.getHttpServer()).post('/auth/login').send({
    password: adminUser.password,
    email: adminUser.email,
  });

  const access_token = response.body.access_token;
  return { Authorization: `Bearer ${access_token}` };
}

export async function getLawyerToken(app: INestApplication) {
  const response = await request(app.getHttpServer()).post('/auth/login').send({
    password: lawyerUser.password,
    email: lawyerUser.email,
  });

  const access_token = response.body.access_token;
  return { Authorization: `Bearer ${access_token}` };
}

export async function getSecretaryToken(app: INestApplication) {
  const response = await request(app.getHttpServer()).post('/auth/login').send({
    password: secretaryUser.password,
    email: secretaryUser.email,
  });

  const access_token = response.body.access_token;
  return { Authorization: `Bearer ${access_token}` };
}

export async function getUser1Token(app: INestApplication) {
  const response = await request(app.getHttpServer()).post('/auth/login').send({
    password: user1.password,
    email: user1.email,
  });

  const access_token = response.body.access_token;
  return { Authorization: `Bearer ${access_token}` };
}
