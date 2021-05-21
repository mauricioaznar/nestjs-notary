import { Connection } from 'mysql2/promise';

export const cleanClientsGrantors = async (connection: Connection) => {
  await connection.execute(`delete from client_grantor where id > 0`);
  await connection.execute(`delete from clients where id > 0`);
  await connection.execute('delete from `grantors` where id > 0');
  await connection.execute(`ALTER TABLE client_grantor AUTO_INCREMENT = 1`);
  await connection.execute(`ALTER TABLE clients AUTO_INCREMENT = 1`);
  await connection.execute('ALTER TABLE `grantors` AUTO_INCREMENT = 1');
};
