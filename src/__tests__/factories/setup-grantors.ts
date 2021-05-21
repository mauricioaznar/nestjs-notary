import { Connection } from 'mysql2/promise';
import { grantor1, grantor2, grantor3 } from '../objects/grantors';

export const setupGrantors = async (connection: Connection) => {
  await connection.execute(`
  INSERT INTO grantors (id, name, lastname, fullname, email, phone)
    VALUES
      ('${grantor1.id}','','','','',''),
      ('${grantor2.id}','','','','',''),
      ('${grantor3.id}','','','','','');
  `);
};
