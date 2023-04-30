import { Pool } from "mysql2"
import {Db} from "../../../../Db/Db"

type sub = {
    id: number,
    email: string,
    createdAt: string
}

export class Sub{
    async createSub(email: string, res: Record<string, any>): Promise<Response | void>{
        const db: Db = new Db()
        
        try{
            const result: sub[] = await db.selectAll<sub>("Subs")
            console.log(result , typeof(result))

        }catch (e){
            console.log(e)
            throw (e)
        }     
    }
}