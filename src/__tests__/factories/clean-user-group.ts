import { Connection } from 'mysql2/promise';

export const cleanUserGroup = async (connection: Connection) => {
  await connection.execute('delete from `user_group` where id > 0');
  await connection.execute('ALTER TABLE `user_group` AUTO_INCREMENT = 1');
};
