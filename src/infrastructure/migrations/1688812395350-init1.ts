import { MigrationInterface, QueryRunner } from "typeorm";

export class Init11688812395350 implements MigrationInterface {
    name = 'Init11688812395350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "rating" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "rating" SET NOT NULL`);
    }

}
