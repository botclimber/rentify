const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

exports.tokenHandler = function(req){
    return new Promise( (r, e) => {

        const token = req.headers['r-access-token']
        if(!token) e({statusCode: 401, msg: 'r-access-token must exist in headers'})
        else {
            jwt.verify(token, SECRET, function (err, decoded) {
                if (err)
                    e({statusCode: 400, msg: 'Failed to auth token'})

                r(Object.assign({}, req.body, decoded))
            })
        }
    })
}


/*
- diff approach
exports.tkHandler = async function(req){

    const token = req.headers['r-access-token']
    if(!token) throw {statusCode: 401, msg: 'r-access-token must exist in headers'}
    else {
        return new Promise( (resolve)  => {
            jwt.verify(token, SECRET, function (err, decoded) {
                
                if (err)
                    throw {statusCode: 400, msg: 'Failed to auth token'}
    
                resolve(Object.assign({}, req.body, decoded))
            })
        }) 
    }
}*/