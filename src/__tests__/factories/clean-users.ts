import { Connection } from 'mysql2/promise';

export const cleanUsers = async (connection: Connection) => {
  await connection.execute(`delete from users where id > 0`);
  await connection.execute(`ALTER TABLE users AUTO_INCREMENT = 1`);
};
