import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677590149829 implements MigrationInterface {
    name = 'default1677590149829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(60) NOT NULL, \`username\` varchar(30) NOT NULL, \`firstName\` varchar(30) NOT NULL, \`lastName\` varchar(30) NOT NULL, \`password\` varchar(128) NOT NULL, \`type\` varchar(30) NOT NULL, \`blocked\` tinyint NOT NULL DEFAULT 0, \`verified\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` (\`email\`), UNIQUE INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ffc81a3b97dcbf8e320d5106c0\` ON \`Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}
