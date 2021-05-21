import { FieldPacket, RowDataPacket } from 'mysql2';
import { Connection } from 'mysql2/promise';

export async function areEntitiesActiveMysql(
  connection: Connection,
  tableName: string,
  columnNames: {
    hostColumnName: string;
    hostColumnId: number;
    inverseColumnName: string;
    extraProperties?: Record<string, any>;
  },
  entities: { id: number }[],
) {
  let areActive = false;
  const { hostColumnName, inverseColumnName, hostColumnId } = columnNames;

  for await (const { id } of entities) {
    let query = `select * from ${tableName}
            where ${hostColumnName} = ${hostColumnId}
            and ${inverseColumnName} = ${id}
            and active = 1`;

    if (columnNames.extraProperties) {
      for (const property in columnNames.extraProperties) {
        if (columnNames.extraProperties.hasOwnProperty(property)) {
          query += ` and ${property} = ${columnNames.extraProperties[property]}`;
        }
      }
    }

    const [res]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      query,
    );
    if (res.length > 0) {
      areActive = true;
      break;
    }
  }

  return areActive;
}
