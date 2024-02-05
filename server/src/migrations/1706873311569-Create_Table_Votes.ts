import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableVotes1706873311569 implements MigrationInterface {
  name = 'CreateTableVotes1706873311569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "votes" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "answer" boolean NOT NULL, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "userId" uuid, "subjectId" uuid, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_5169384e31d0989699a318f3ca4" FOREIGN KEY ("userId") 
      REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_d02c0085d55936916a640b5ef39" FOREIGN KEY ("subjectId") 
      REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_d02c0085d55936916a640b5ef39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_5169384e31d0989699a318f3ca4"`,
    );
    await queryRunner.query(`DROP TABLE "votes"`);
  }
}
