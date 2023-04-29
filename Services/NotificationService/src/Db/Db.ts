import {createPool, Pool} from "mysql2";
import dotenv from "dotenv";
dotenv.config();

type DbConfig = {
    host: string,
    user: string,
    password: string,
    database: string,
    //connectionLimit?: number
}

export class Db {
    private dbConfig: Required<DbConfig> = {
        host: process.env.DB_HOST || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
    }

    async openConnection(): Promise<Pool> {
        const connection = await createPool(this.dbConfig);
        return connection;
    }
}