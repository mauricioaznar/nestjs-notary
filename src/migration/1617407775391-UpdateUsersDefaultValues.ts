import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsersDefaultValues1617407775391
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `users` ALTER `phone` SET DEFAULT '';",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
