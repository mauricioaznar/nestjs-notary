import { Connection } from 'mysql2/promise';
import { client1, client2, client3 } from '../objects/clients';

export const setupClients = async (connection: Connection) => {
  await connection.execute(`
  INSERT INTO clients (id, name, lastname, fullname, email, phone)
    VALUES
        ('${client1.id}','','','','',''),
        ('${client2.id}','','','','',''),
      ('${client3.id}','','','','','');
  `);
};
