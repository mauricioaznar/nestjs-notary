import { Connection } from 'mysql2/promise';
import { adminRole, lawyerRole, secretaryRole } from '../objects/roles';

export const setupRoles = async (connection: Connection) => {
  await connection.execute(`delete from roles where id > 0`);
  await connection.execute(`ALTER TABLE roles AUTO_INCREMENT = 1`);
  await connection.execute(`
  INSERT INTO roles (id, name)
    VALUES('${adminRole.id}','${adminRole.name}')
  `);
  await connection.execute(`
  INSERT INTO roles (id, name)
    VALUES('${lawyerRole.id}','${lawyerRole.name}')
  `);
  await connection.execute(`
  INSERT INTO roles (id, name)
    VALUES('${secretaryRole.id}','${secretaryRole.name}')
  `);
};
