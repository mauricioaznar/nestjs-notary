import { Connection } from 'mysql2/promise';
import { user1, user2, user3 } from '../objects/users';
import { group1, group2, group3 } from '../objects/groups';

export const setupUserGroup = async (connection: Connection) => {
  await insertUserGroup(connection, user1, group1);
  await insertUserGroup(connection, user2, group2);
  await insertUserGroup(connection, user3, group3);
};

async function insertUserGroup(connection: Connection, user, group) {
  await connection.execute(`
  INSERT INTO user_group (user_id, group_id)
    VALUES('${user.id}', '${group.id}')
  `);
}
