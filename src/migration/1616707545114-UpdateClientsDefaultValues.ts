import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateClientsDefaultValues1616707545114
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `clients` ALTER `email` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `clients` ALTER `phone` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `clients` ALTER `address1` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `clients` ALTER `address2` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `clients` ALTER `country` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `clients` ALTER `city` SET DEFAULT '';",
    );
    await queryRunner.query(
      "ALTER TABLE `clients` ALTER `zip_code` SET DEFAULT '';",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
