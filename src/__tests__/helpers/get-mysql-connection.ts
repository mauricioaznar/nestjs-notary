import * as mysql from 'mysql2/promise';

export async function getMysqlConnection() {
  const connection = await mysql.createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
  });
  return connection;
}
