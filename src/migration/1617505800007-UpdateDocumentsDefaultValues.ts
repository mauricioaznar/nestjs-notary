import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDocumentsDefaultValues1617505800007
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `documents` ALTER `document_type_other` SET DEFAULT '';",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
