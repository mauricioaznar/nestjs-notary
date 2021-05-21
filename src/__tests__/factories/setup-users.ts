import { Connection } from 'mysql2/promise';
import {
  adminUser,
  groupLeaderUser,
  lawyerUser,
  secretaryUser,
  user1,
  user2,
  user3,
} from '../objects/users';

export const setupUsers = async (connection: Connection) => {
  await connection.execute(`delete from users where id > 0`);
  await connection.execute(`ALTER TABLE users AUTO_INCREMENT = 1`);
  await insertUser(connection, adminUser);
  await insertUser(connection, groupLeaderUser);
  await insertUser(connection, lawyerUser);
  await insertUser(connection, secretaryUser);
  await insertUser(connection, user1);
  await insertUser(connection, user2);
  await insertUser(connection, user3);
};

async function insertUser(connection: Connection, user) {
  await connection.execute(`
  INSERT INTO users (id, name, lastname, fullname, email, password, phone, role_id)
    VALUES('${user.id}','','','', '${user.email}', '${user.password_hash}','', '${user.role_id}')
  `);
}
