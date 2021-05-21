import { Connection } from 'mysql2/promise';
import { attachment1, attachment2, attachment3 } from '../objects/attachments';
import { operation1, operation2, operation3 } from '../objects/operations';
import {
  documentType1,
  documentType2,
  documentType3,
} from '../objects/documentTypes';
import {
  deliveredStatus,
  deliverStatus,
  pendingStatus,
  registryStatus,
} from '../objects/documentStatuses';

export const setupDocuments = async (connection: Connection) => {
  await insertAttachment(connection, attachment1);
  await insertAttachment(connection, attachment2);
  await insertAttachment(connection, attachment3);

  await insertOperation(connection, operation1);
  await insertOperation(connection, operation2);
  await insertOperation(connection, operation3);

  await insertDocumentType(connection, documentType1);
  await insertDocumentType(connection, documentType2);
  await insertDocumentType(connection, documentType3);

  await insertDocumentStatus(connection, pendingStatus);
  await insertDocumentStatus(connection, registryStatus);
  await insertDocumentStatus(connection, deliverStatus);
  await insertDocumentStatus(connection, deliveredStatus);

  await insertDocumentTypeAttachment(connection, documentType1, attachment1);
  await insertDocumentTypeAttachment(connection, documentType2, attachment2);
  await insertDocumentTypeAttachment(connection, documentType3, attachment3);

  await insertDocumentTypeOperation(connection, documentType1, operation1);
  await insertDocumentTypeOperation(connection, documentType2, operation2);
  await insertDocumentTypeOperation(connection, documentType3, operation3);
};

async function insertAttachment(connection: Connection, attachment) {
  await connection.execute(`
  INSERT INTO attachments (id, name)
    VALUES('${attachment.id}', '${attachment.name}')
  `);
}

async function insertOperation(connection: Connection, operation) {
  await connection.execute(`
  INSERT INTO operations (id, name)
    VALUES('${operation.id}', '${operation.name}')
  `);
}

async function insertDocumentStatus(connection: Connection, documentStatus) {
  await connection.execute(`
  INSERT INTO document_status (id, name)
    VALUES('${documentStatus.id}', '${documentStatus.name}')
  `);
}

async function insertDocumentType(connection: Connection, documentType) {
  await connection.execute(`
  INSERT INTO document_type (id, name)
    VALUES('${documentType.id}', '${documentType.name}')
  `);
}

async function insertDocumentTypeAttachment(
  connection: Connection,
  documentType,
  attachment,
) {
  await connection.execute(`
  INSERT INTO document_type_attachment (document_type_id, attachment_id)
    VALUES('${documentType.id}', '${attachment.id}')
  `);
}

async function insertDocumentTypeOperation(
  connection: Connection,
  documentType,
  operation,
) {
  await connection.execute(`
  INSERT INTO document_type_operation (document_type_id, operation_id)
    VALUES('${documentType.id}', '${operation.id}')
  `);
}
