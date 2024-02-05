import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSubject1706872284878 implements MigrationInterface {
  name = 'CreateTableSubject1706872284878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."subject_category_enum" AS ENUM('GAMES', 'POLICY', 'TRAFFIC', 'FINANCE', 'SCHOOL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "subject" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "title" character varying NOT NULL, 
        "category" "public"."subject_category_enum" NOT NULL,
        "description" character varying NOT NULL, 
        "activeUntil" TIMESTAMP NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "subject"`);
  }
}
