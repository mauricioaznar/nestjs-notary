import * as mysql from 'mysql2/promise';
import { setupUsers } from './factories/setup-users';
import { setupRooms } from './factories/setup-rooms';
import { setupClients } from './factories/setup-clients';
import { cleanAppointments } from './factories/clean-appointments';
import { setupRoles } from './factories/setup-roles';
import { cleanUsers } from './factories/clean-users';
import { cleanGroups } from './factories/clean-groups';
import { setupGroups } from './factories/setup-groups';
import { cleanClientsGrantors } from './factories/clean-clients-grantors';
import { setupGrantors } from './factories/setup-grantors';
import { cleanDocuments } from './factories/clean-documents';
import { setupDocuments } from './factories/setup-documents';
import { setupUserGroup } from './factories/setup-user_group';
import { cleanUserGroup } from './factories/clean-user-group';
import { cleanActivities } from './factories/clean-activities';

export default async function setup() {
  const connection = await mysql.createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  });

  // clean static relations
  await cleanUserGroup(connection);
  await cleanActivities(connection);

  // clean statics entities
  await cleanDocuments(connection);
  await cleanAppointments(connection);
  await cleanGroups(connection);
  await cleanUsers(connection);
  await cleanClientsGrantors(connection);

  // static entities
  await setupRoles(connection);
  await setupUsers(connection);
  await setupGroups(connection);
  await setupRooms(connection);
  await setupClients(connection);
  await setupGrantors(connection);
  await setupDocuments(connection);

  // static relations
  await setupUserGroup(connection);
}
