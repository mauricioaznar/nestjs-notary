import * as mysql from 'mysql2';

(async function () {
  const connection = await mysql.createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
  });

  connection.execute(`drop database if exists ${process.env.DB}`);
  connection.execute(`create database ${process.env.DB}`);

  connection.end();
})();
