import { Connection } from 'mysql2/promise';
import { group1, group2, group3 } from '../objects/groups';

export const setupGroups = async (connection: Connection) => {
  await insertGroup(connection, group1);
  await insertGroup(connection, group2);
  await insertGroup(connection, group3);
};

async function insertGroup(connection: Connection, group) {
  await connection.execute(
    "INSERT INTO `groups` (id, name, user_id) VALUES ('" +
      group.id +
      "', '" +
      group.name +
      "', '" +
      group.user_id +
      "' )",
  );
}
