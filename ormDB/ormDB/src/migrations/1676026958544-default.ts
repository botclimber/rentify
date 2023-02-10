import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676026958544 implements MigrationInterface {
    name = 'default1676026958544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reviews\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`adminId\` int NOT NULL, \`review\` text NOT NULL, \`rating\` int NOT NULL, \`createdOn\` datetime NOT NULL, \`approvedOn\` datetime NOT NULL, \`anonymous\` tinyint NOT NULL, \`approved\` int NOT NULL, \`residenceAddressesId\` int NULL, UNIQUE INDEX \`REL_6e1b95f8483c03df7f0980e8cb\` (\`residenceAddressesId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`residence_addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`floor\` varchar(255) NOT NULL, \`direction\` varchar(255) NOT NULL, \`addressesId\` int NULL, UNIQUE INDEX \`REL_990e0d911626875561193aece8\` (\`addressesId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`lat\` double NOT NULL, \`lng\` double NOT NULL, \`city\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`nr\` int NOT NULL, \`postalCode\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_6e1b95f8483c03df7f0980e8cbc\` FOREIGN KEY (\`residenceAddressesId\`) REFERENCES \`residence_addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` ADD CONSTRAINT \`FK_990e0d911626875561193aece80\` FOREIGN KEY (\`addressesId\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` DROP FOREIGN KEY \`FK_990e0d911626875561193aece80\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_6e1b95f8483c03df7f0980e8cbc\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
        await queryRunner.query(`DROP INDEX \`REL_990e0d911626875561193aece8\` ON \`residence_addresses\``);
        await queryRunner.query(`DROP TABLE \`residence_addresses\``);
        await queryRunner.query(`DROP INDEX \`REL_6e1b95f8483c03df7f0980e8cb\` ON \`reviews\``);
        await queryRunner.query(`DROP TABLE \`reviews\``);
    }

}
