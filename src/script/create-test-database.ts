import * as mysql from 'mysql2';

(async function () {
  const connection = await mysql.createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
  });

  connection.execute(`drop database if exists monsreal_test`);
  connection.execute(`create database monsreal_test`);

  connection.end();
})();
