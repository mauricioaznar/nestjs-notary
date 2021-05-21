import { Connection } from 'mysql2/promise';

export const cleanGroups = async (connection: Connection) => {
  await connection.execute('delete from `groups` where id > 0');
  await connection.execute('ALTER TABLE `groups` AUTO_INCREMENT = 1');
};
