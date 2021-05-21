import { Connection } from 'mysql2/promise';
import { room1, room2, room3 } from '../objects/rooms';

export const setupRooms = async (connection: Connection) => {
  await connection.execute(`delete from rooms where id > 0`);
  await connection.execute(`ALTER TABLE rooms AUTO_INCREMENT = 1`);
  await connection.execute(`
  INSERT INTO rooms (id, name)
    VALUES 
      ('${room1.id}', '${room1.name}'),
      ('${room2.id}', '${room2.name}'),
      ('${room3.id}', '${room3.name}');
  `);
};
