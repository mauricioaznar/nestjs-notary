import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDocumentsWithExpectedCompletionDate1641252400375
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `documents` ADD `expected_completion_date` date DEFAULT NULL;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
