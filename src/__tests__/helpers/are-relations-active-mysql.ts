import { FieldPacket, RowDataPacket } from 'mysql2';
import { Connection } from 'mysql2/promise';

export async function areRelationsActiveMysql(
  connection: Connection,
  tableName: string,

  relations: { id: number }[],
) {
  let areActive = false;
  for await (const { id } of relations) {
    const [res]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      `select * from ${tableName}
            where id = ${id}
            and active = 1`,
    );
    if (res.length > 0) {
      areActive = true;
      break;
    }
  }

  return areActive;
}
