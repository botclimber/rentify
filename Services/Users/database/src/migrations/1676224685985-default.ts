import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676224685985 implements MigrationInterface {
    name = 'default1676224685985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(60) NOT NULL, \`username\` varchar(30) NOT NULL, \`password\` varchar(128) NOT NULL, UNIQUE INDEX \`IDX_fca5840681c3854ea15e03e4a2\` (\`email\`), UNIQUE INDEX \`IDX_e6f9369e99cf2ac55215b667ff\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(60) NOT NULL, \`username\` varchar(30) NOT NULL, \`firstName\` varchar(30) NOT NULL, \`lastName\` varchar(30) NOT NULL, \`password\` varchar(128) NOT NULL, \`verified\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), UNIQUE INDEX \`IDX_29a05908a0fa0728526d283365\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_29a05908a0fa0728526d283365\` ON \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_e6f9369e99cf2ac55215b667ff\` ON \`Admin\``);
        await queryRunner.query(`DROP INDEX \`IDX_fca5840681c3854ea15e03e4a2\` ON \`Admin\``);
        await queryRunner.query(`DROP TABLE \`Admin\``);
    }

}
