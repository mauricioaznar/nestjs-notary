import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateGrantorsDefaultValues1616719721252
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `grantors` ALTER `email` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `grantors` ALTER `phone` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `grantors` ALTER `address1` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `grantors` ALTER `address2` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `grantors` ALTER `country` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `grantors` ALTER `city` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `grantors` ALTER `zip_code` SET DEFAULT '';",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
