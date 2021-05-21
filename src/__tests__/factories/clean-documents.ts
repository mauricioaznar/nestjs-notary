import { Connection } from 'mysql2/promise';

export const cleanDocuments = async (connection: Connection) => {
  await connection.execute(`delete from document_attachment where id > 0`);
  await connection.execute(
    `ALTER TABLE document_attachment AUTO_INCREMENT = 1`,
  );
  await connection.execute(`delete from document_comment where id > 0`);
  await connection.execute(`ALTER TABLE document_comment AUTO_INCREMENT = 1`);
  await connection.execute(`delete from document_group where id > 0`);
  await connection.execute(`ALTER TABLE document_group AUTO_INCREMENT = 1`);
  await connection.execute(`delete from document_grantor where id > 0`);
  await connection.execute(`ALTER TABLE document_grantor AUTO_INCREMENT = 1`);
  await connection.execute(`delete from document_operation where id > 0`);
  await connection.execute(`ALTER TABLE document_operation AUTO_INCREMENT = 1`);
  await connection.execute(`delete from document_property where id > 0`);
  await connection.execute(`ALTER TABLE document_property AUTO_INCREMENT = 1`);
  await connection.execute(`delete from document_user where id > 0`);
  await connection.execute(`ALTER TABLE document_user AUTO_INCREMENT = 1`);
  await connection.execute(`delete from documents where id > 0`);
  await connection.execute(`ALTER TABLE documents AUTO_INCREMENT = 1`);
  await connection.execute(`delete from document_status where id > 0`);
  await connection.execute(`ALTER TABLE document_status AUTO_INCREMENT = 1`);
  await connection.execute(`delete from document_type_attachment where id > 0`);
  await connection.execute(
    `ALTER TABLE document_type_attachment AUTO_INCREMENT = 1`,
  );
  await connection.execute(`delete from document_type_operation where id > 0`);
  await connection.execute(
    `ALTER TABLE document_type_operation AUTO_INCREMENT = 1`,
  );
  await connection.execute(`delete from document_type where id > 0`);
  await connection.execute(`ALTER TABLE document_type AUTO_INCREMENT = 1`);
  await connection.execute(`delete from attachments where id > 0`);
  await connection.execute(`ALTER TABLE attachments AUTO_INCREMENT = 1`);
  await connection.execute(`delete from operations where id > 0`);
  await connection.execute(`ALTER TABLE operations AUTO_INCREMENT = 1`);
};
