import {Db} from "../../../../Db/Db"
import {sub} from "../../../travis_types/typeModels"

export class Sub{
    async createSub(email: string, res: Record<string, any>): Promise<Response | void>{
        const db: Db = new Db()

        const Sub: sub = {
            email: email,
            createdAt: "1000-01-01"
        }
        
        try{
            const result: number = await db.insert(Sub)
            console.log(result , typeof(result))
            if(result)
                res.status(200).json({"msg":"row created, thanks!"})

        }catch (e){
            console.log(e)
            throw (e)
        }     
    }
}