import {Request} from "express"
import {User} from "../../travis_types/typeModels"
import jwt from "jsonwebtoken"

// ?? if left value is null or undefined || is left value is false
const SECRET: string = process.env.SECRET ?? ""

export function tokenHandler(req: Request): Promise<Request["body"] & User>{

    return new Promise( (r, e) => {

        const tokenFromQuery: any = req.query.token
        const tokenFromHeader: () => string | undefined = () => {
            const header: string | undefined = req.headers['authorization']

            if(header) return header.split(" ")[1]
            return undefined
        }

        const token = (tokenFromQuery)? tokenFromQuery : tokenFromHeader
        
        if(token){
            
            jwt.verify(token, SECRET, (err: any, decoded: any) => {
                if (err)
                    e({statusCode: 400, msg: 'Failed to auth token'})

                if(!(decoded.id && decoded.type && decoded.email)) 
                    e({statusCode: 400, msg: 'missing required keys'})

                r(Object.assign({}, req.body, decoded))

            })

        }else e({statusCode: 401, msg: 'authorization must exist in headers'})

    })
}