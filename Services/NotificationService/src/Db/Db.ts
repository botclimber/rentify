import {createPool, Pool, Query} from "mysql2";
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
    private _dbConfig: Required<DbConfig> = {
        host: process.env.DB_HOST || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
    }

    async openConnection(): Promise<Pool> {
        const connection = createPool(this._dbConfig);
        return connection;
    }

    // selectAll
    //TODO: teste result and add proper generic type
    async selectAll<T>(table: string): Promise<T[]>  {
        const con = await this.openConnection()

        try{
            
            const sql = `SELECT * FROM ${table}`
            const res: any[] = await con.promise().execute(sql)
            return res[0]

        }catch (e){
            console.log(e)
            throw e
        }finally{
            con.end(() => {/* close connection */})
        }
    }
    // insert

    // update

    // delete
}