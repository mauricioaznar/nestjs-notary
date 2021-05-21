import * as request from 'supertest';
import {
  getAdminToken,
  getLawyerToken,
  getSecretaryToken,
} from './factories/get-token';
import { INestApplication } from '@nestjs/common';
import { setupApp } from './factories/setup-app';
import { room1 } from './objects/rooms';
import { adminUser, secretaryUser } from './objects/users';
import { client1, client2, client3 } from './objects/clients';
import * as moment from 'moment';
import { datetimeFormat } from './helpers/dates';
import { getMysqlConnection } from './helpers/get-mysql-connection';
import { Connection } from 'mysql2/promise';
import { areEntitiesActiveMysql } from './helpers/are-entities-active-mysql';

describe('Appointments', () => {
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

  describe('find appointments by date', () => {
    it('returns a list of appointments', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .get('/appointments')
        .query({ startDate: '2020-01-01' })
        .set(await getAdminToken(app));

      expect(appointmentResponse.status).toBe(200);
      expect(appointmentResponse.body).toBeInstanceOf(Array);
    });

    it('rejects when searchDate is missing', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .get('/appointments')
        .set(await getAdminToken(app));

      expect(appointmentResponse.status).toBe(400);
    });

    it('rejects when a token is missing', async () => {
      const appointmentResponse = await request(app.getHttpServer()).get(
        '/appointments',
      );

      expect(appointmentResponse.status).toBe(401);
    });
  });

  describe('register an appointment', () => {
    const createAppointmentProperties = {
      name: 'A name',
      description: 'sfsdfg',
      roomId: room1.id,
      startDate: '2020-01-01 08:00:00',
      endDate: '2020-01-01 09:00:00',
      users: [adminUser],
      clients: [client1],
    };

    it('rejects when token is missing', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          ...createAppointmentProperties,
          startDate: '2020-01-03 16:00:00',
          endDate: '2020-01-03 17:00:00',
        });

      expect(appointmentResponse.status).toBe(401);
    });

    it('approves when all properties are correct', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          ...createAppointmentProperties,
        })
        .set(await getAdminToken(app));

      expect(appointmentResponse.body).toHaveProperty('id');
      expect(appointmentResponse.body.createdByUserId).toBeDefined();
      expect(appointmentResponse.body.createdByUserId).toEqual(adminUser.id);
      expect(
        moment(appointmentResponse.body.startDate).format(datetimeFormat),
      ).toEqual('2020-01-01 08:00:00');
      expect(
        moment(appointmentResponse.body.endDate).format(datetimeFormat),
      ).toEqual('2020-01-01 09:00:00');
      expect(appointmentResponse.body.name).toEqual('A name');
      expect(appointmentResponse.body.description).toEqual('sfsdfg');
      expect(appointmentResponse.body.clients).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: client1.id })]),
      );
      expect(appointmentResponse.body.users).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: adminUser.id })]),
      );
      expect(appointmentResponse.status).toBe(201);
    });

    it('rejects when startDate is before endDate', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          ...createAppointmentProperties,
          startDate: '2020-01-03 08:00:00',
          endDate: '2020-01-03 07:00:00',
        })
        .set(await getAdminToken(app));

      expect(appointmentResponse.status).toBe(400);
    });

    describe('appointment dates', () => {
      const appointment1properties = {
        name: 'A name',
        description: 'sfsdfg',
        roomId: room1.id,
        startDate: '2020-01-02 08:00:00',
        endDate: '2020-01-02 09:00:00',
        users: [adminUser],
        clients: [client1],
      };
      beforeEach(async () => {
        await request(app.getHttpServer())
          .post('/appointments')
          .send({
            ...appointment1properties,
          })
          .set(await getAdminToken(app));
      });

      it('rejects when there is an appointment already on those dates', async () => {
        const appointmentResponse = await request(app.getHttpServer())
          .post('/appointments')
          .send({
            ...appointment1properties,
          })
          .set(await getAdminToken(app));

        expect(appointmentResponse.status).toBe(400);
      });
    });

    for (const [key, value] of Object.entries(createAppointmentProperties)) {
      if (createAppointmentProperties.hasOwnProperty(key)) {
        const copyProperties = { ...createAppointmentProperties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const appointmentResponse = await request(app.getHttpServer())
            .post('/appointments')
            .send({
              ...createAppointmentProperties,
            })
            .set(await getAdminToken(app));

          expect(appointmentResponse.status).toBe(400);
        });
      }
    }
  });

  describe('gets appointment', () => {
    const createdAppointmentProperties = {
      name: 'A name',
      description: 'A desc',
      roomId: room1.id,
      startDate: '2020-02-01 08:00:00',
      endDate: '2020-02-01 09:00:00',
      users: [adminUser],
      clients: [client1],
    };
    let appointment;
    beforeAll(async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          ...createdAppointmentProperties,
        })
        .set(await getAdminToken(app));
      appointment = appointmentResponse.body;
    });

    test('get appointment', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .get(`/appointments/${appointment.id}`)
        .set(await getAdminToken(app));

      expect(appointmentResponse.status).toBe(200);
      expect(appointmentResponse.body).toHaveProperty('id');
      expect(appointmentResponse.body.createdByUserId).toBeDefined();
      expect(appointmentResponse.body.createdByUserId).toEqual(adminUser.id);
      expect(
        moment(appointmentResponse.body.startDate).format(datetimeFormat),
      ).toEqual('2020-02-01 08:00:00');
      expect(
        moment(appointmentResponse.body.endDate).format(datetimeFormat),
      ).toEqual('2020-02-01 09:00:00');
      expect(appointmentResponse.body.name).toEqual('A name');
      expect(appointmentResponse.body.description).toEqual('A desc');
      expect(appointmentResponse.body.clients).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: client1.id })]),
      );
      expect(appointmentResponse.body.users).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: adminUser.id })]),
      );
    });

    test('get not existent appointment', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .get(`/appointments/300`)
        .set(await getAdminToken(app));

      expect(appointmentResponse.status).toBe(404);
    });
  });

  describe('patches appointment', () => {
    const createdAppointmentProperties = {
      name: 'A name',
      description: 'A name',
      roomId: room1.id,
      startDate: '2020-03-01 08:00:00',
      endDate: '2020-03-01 09:00:00',
      users: [adminUser],
      clients: [client1],
    };
    let appointment;
    beforeAll(async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          ...createdAppointmentProperties,
        })
        .set(await getSecretaryToken(app));
      appointment = appointmentResponse.body;
    });

    it('approves when all properties are correct', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .patch(`/appointments/${appointment.id}`)
        .send({
          ...createdAppointmentProperties,
          name: 'name',
          clients: [client2],
          users: [secretaryUser],
        })
        .set(await getSecretaryToken(app));

      expect(appointmentResponse.body).toHaveProperty('id');
      expect(appointmentResponse.body.name).toEqual('name');
      expect(appointmentResponse.body.clients).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: client2.id })]),
      );
      expect(appointmentResponse.body.users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: secretaryUser.id }),
        ]),
      );
      expect(appointmentResponse.status).toBe(200);
    });

    it('rejects when gets edited by another user that is not the user that created it ', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .patch(`/appointments/${appointment.id}`)
        .send({
          ...createdAppointmentProperties,
          name: 'name',
          clients: [client2],
          users: [secretaryUser],
        })
        .set(await getLawyerToken(app));

      expect(appointmentResponse.status).toBe(403);
    });

    it('approves when it is an admin regardless of who created it', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .patch(`/appointments/${appointment.id}`)
        .send({
          ...createdAppointmentProperties,
          name: 'name',
          clients: [client2],
          users: [secretaryUser],
        })
        .set(await getAdminToken(app));

      expect(appointmentResponse.status).toBe(200);
    });

    it('rejects when startDate is before endDate', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .patch(`/appointments/${appointment.id}`)
        .send({
          ...createdAppointmentProperties,
          startDate: '2020-02-01 08:00:00',
          endDate: '2020-02-01 07:30:00',
        })
        .set(await getSecretaryToken(app));

      expect(appointmentResponse.status).toBe(400);
    });

    it('allows to edit same appointment on a date within the original range', async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .patch(`/appointments/${appointment.id}`)
        .send({
          ...createdAppointmentProperties,
          startDate: '2020-03-01 08:00:00',
          endDate: '2020-03-01 08:30:00',
        })
        .set(await getSecretaryToken(app));

      expect(appointmentResponse.body).toHaveProperty('id');
      expect(appointmentResponse.status).toBe(200);
    });

    describe('with created appointment', () => {
      const appointment1properties = {
        name: 'A name',
        description: 'A name',
        roomId: room1.id,
        startDate: '2020-03-02 08:00:00',
        endDate: '2020-03-02 09:00:00',
        users: [adminUser],
        clients: [client1],
      };
      beforeAll(async () => {
        await request(app.getHttpServer())
          .post('/appointments')
          .send({
            ...appointment1properties,
          })
          .set(await getAdminToken(app));
      });

      it('forbids to patch an appointment on occupied dates', async () => {
        const appointmentResponse = await request(app.getHttpServer())
          .patch(`/appointments/${appointment.id}`)
          .send({
            ...createdAppointmentProperties,
            startDate: '2020-03-02 08:00:00',
            endDate: '2020-03-02 08:30:00',
          })
          .set(await getAdminToken(app));

        expect(appointmentResponse.status).toBe(400);
      });
    });

    for (const [key, value] of Object.entries(createdAppointmentProperties)) {
      if (createdAppointmentProperties.hasOwnProperty(key)) {
        const copyProperties = { ...createdAppointmentProperties };
        delete copyProperties[key];

        it(`rejects when ${key} is missing`, async () => {
          const appointmentResponse = await request(app.getHttpServer())
            .patch(`/appointments/${appointment.id}`)
            .send({
              ...copyProperties,
            })
            .set(await getAdminToken(app));

          expect(appointmentResponse.status).toBe(400);
        });
      }
    }
  });

  describe('removes appointment', () => {
    const appointment1Properties = {
      name: 'A name',
      description: 'A name',
      roomId: room1.id,
      startDate: '2020-04-01 08:00:00',
      endDate: '2020-04-01 09:00:00',
      users: [adminUser],
      clients: [client1],
    };
    let appointment1;
    beforeAll(async () => {
      const appointmentResponse = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          ...appointment1Properties,
        })
        .set(await getAdminToken(app));
      appointment1 = appointmentResponse.body;
    });

    it('get not found after it has been removed', async () => {
      await request(app.getHttpServer())
        .delete(`/appointments/${appointment1.id}`)
        .set(await getAdminToken(app));

      const appointmentResponse = await request(app.getHttpServer())
        .get(`/appointments/${appointment1.id}`)
        .set(await getAdminToken(app));

      expect(appointmentResponse.status).toBe(404);

      const areClientsActive = await areEntitiesActiveMysql(
        connection,
        'appointment_client',
        {
          hostColumnName: 'appointment_id',
          hostColumnId: appointment1.id,
          inverseColumnName: 'client_id',
        },
        appointment1.clients,
      );

      expect(areClientsActive).toBe(false);

      const areUsersActive = await areEntitiesActiveMysql(
        connection,
        'appointment_user',
        {
          hostColumnName: 'appointment_id',
          hostColumnId: appointment1.id,
          inverseColumnName: 'user_id',
        },
        appointment1.users,
      );

      expect(areUsersActive).toBe(false);
      // const isProductionEventActive = await isEntityActiveMysql(
      //   connection,
      //   'production_events',
      //   postResponseProductionEvent.id,
      // );
    });

    it('rejects when user is not the same as the one who created it', async () => {
      const appointment2Properties = {
        name: 'A name',
        description: 'A name',
        roomId: room1.id,
        startDate: '2020-04-02 08:00:00',
        endDate: '2020-04-02 09:00:00',
        users: [adminUser],
        clients: [client1],
      };

      const appointment2Response = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          ...appointment2Properties,
        })
        .set(await getLawyerToken(app));

      expect(appointment2Response.status).toBe(201);

      const appointment2 = appointment2Response.body;

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/appointments/${appointment2.id}`)
        .set(await getSecretaryToken(app));

      expect(deleteResponse.status).toBe(403);
    });

    it('can create after it has been removed', async () => {
      const appointment3Properties = {
        name: 'A name',
        description: 'A name',
        roomId: room1.id,
        startDate: '2020-04-03 08:00:00',
        endDate: '2020-04-03 09:00:00',
        users: [adminUser],
        clients: [client1],
      };

      const appointment3Response = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          ...appointment3Properties,
        })
        .set(await getLawyerToken(app));

      expect(appointment3Response.status).toBe(201);

      const appointment3 = appointment3Response.body;

      const deleteResponse = await request(app.getHttpServer())
        .delete(`/appointments/${appointment3.id}`)
        .set(await getLawyerToken(app));

      expect(deleteResponse.status).toBe(200);

      const appointmentRecreateResponse = await request(app.getHttpServer())
        .post('/appointments')
        .send({
          ...appointment3Properties,
        })
        .set(await getLawyerToken(app));

      expect(appointmentRecreateResponse.status).toBe(201);
    });
  });
});
