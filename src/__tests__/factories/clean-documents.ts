import { Connection } from 'mysql2/promise';
import * as path from 'path';
import * as fs from 'fs';

async function deleteFilesIfExists(files: { file_name: string }[]) {
  try {
    const promises = files.map(async (file) => {
      const { file_name } = file;

      const filePath = path.relative(process.cwd(), 'uploads/' + file_name);
      const exists = await fs.promises.stat(filePath);
      if (exists) {
        await fs.promises.unlink(filePath);
      }
      return {
        file_name,
      };
    });
    return Promise.all(promises);
  } catch (e) {
    console.log('no file');
  }
}

export const cleanDocuments = async (connection: Connection) => {
  const result = await connection.execute(
    'select * from document_file where active = 1',
  );
  if (Array.isArray(result[0])) {
    const files = result[0].map((br) => {
      return {
        file_name: br.file_name,
      };
    });
    await deleteFilesIfExists(files);
  }
  await connection.execute(`delete from document_file where id > 0`);
  await connection.execute(`ALTER TABLE document_file AUTO_INCREMENT = 1`);
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
