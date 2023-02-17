const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const token = jwt.sign({userId: 2, userType: 'admin'}, secret)
const verToken = jwt.verify(token, secret)

console.log(token)
console.log(verToken)

