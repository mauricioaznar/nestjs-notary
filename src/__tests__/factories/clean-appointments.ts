import { Connection } from 'mysql2/promise';

export const cleanAppointments = async (connection: Connection) => {
  await connection.execute(`delete from appointment_user where id > 0`);
  await connection.execute(`delete from appointment_client where id > 0`);
  await connection.execute(`delete from appointments where id > 0`);
  await connection.execute(`ALTER TABLE appointment_user AUTO_INCREMENT = 1`);
  await connection.execute(`ALTER TABLE appointment_client AUTO_INCREMENT = 1`);
  await connection.execute(`ALTER TABLE appointments AUTO_INCREMENT = 1`);
};
