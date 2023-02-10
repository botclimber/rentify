import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676026702909 implements MigrationInterface {
    name = 'default1676026702909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_6e1b95f8483c03df7f0980e8cbc\``);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` DROP FOREIGN KEY \`FK_990e0d911626875561193aece80\``);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` DROP COLUMN \`floor\``);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` ADD \`floor\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` DROP COLUMN \`direction\``);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` ADD \`direction\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`street\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`street\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`postalCode\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`postalCode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`country\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_6e1b95f8483c03df7f0980e8cbc\` FOREIGN KEY (\`residenceAddressesId\`) REFERENCES \`residence_addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` ADD CONSTRAINT \`FK_990e0d911626875561193aece80\` FOREIGN KEY (\`addressesId\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` DROP FOREIGN KEY \`FK_990e0d911626875561193aece80\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_6e1b95f8483c03df7f0980e8cbc\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`country\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`postalCode\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`postalCode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`street\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`street\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` DROP COLUMN \`direction\``);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` ADD \`direction\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` DROP COLUMN \`floor\``);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` ADD \`floor\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`residence_addresses\` ADD CONSTRAINT \`FK_990e0d911626875561193aece80\` FOREIGN KEY (\`addressesId\`) REFERENCES \`renreviews_db\`.\`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_6e1b95f8483c03df7f0980e8cbc\` FOREIGN KEY (\`residenceAddressesId\`) REFERENCES \`renreviews_db\`.\`residence_addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
