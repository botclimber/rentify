import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import 'dotenv/config'

export const myDataSource = new DataSource({
    type: "mysql",
    username: "root",
    password: "admin",
    database: "rentify_db",
    host: "localhost",
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    subscribers: [],
})
