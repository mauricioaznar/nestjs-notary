import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDocumentsWithYearColumn1639700663250
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE documents ADD COLUMN \`year\` int unsigned DEFAULT null;`,
    );
    await queryRunner.query(`UPDATE documents SET \`year\` = YEAR(\`date\`);`);

    await queryRunner.query(`ALTER TABLE \`documents\` DROP COLUMN \`date\`;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
