import { Connection } from 'mysql2/promise';

export const cleanActivities = async (connection: Connection) => {
  await connection.execute(`delete from activities where id > 0`);
  await connection.execute(`ALTER TABLE activities AUTO_INCREMENT = 1`);
};
