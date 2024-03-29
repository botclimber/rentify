// server init goes here
const express = require('express')
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const actions = require("./src/actions.js")
const th = require("./src/tokenHandler.js") // token handler

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(fileupload());
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
})

app.get('/api/v1/search', (req, res) => {

  const address = {city: req.query.city || "Porto", street: req.query.street || "", buildingNumber: req.query.nr || "", onlyAppr: req.query.onlyAppr || 1}
  actions.actions(res).search(address)
})

app.get('/api/v1/reviews', (req, res) => {
  actions.actions(res).getAllReviews()
})

app.post('/api/v1/create', (req, res) => {

 th.tokenHandler(req)
 .then(transfData => {
  const apr = {onlyAppr: req.query.onlyAppr || 1}

   if(transfData) actions.actions(res).insertReview({...transfData, ...apr})
 })
 .catch(err => { console.log(err); res.status(err.statusCode).send(JSON.stringify({msg: err.msg})) })

})

// TODO: check if userType is col,admin or superAdmin
app.patch('/api/v1/updateReview/:revId', (req, res) => {

  th.tokenHandler(req)
 .then(transfData => {
   if(transfData) actions.actions(res).updateReviewState({adminId: transfData.userId, userType: transfData.userType, revId: req.params.revId, decision: transfData.decision})
 })
 .catch(err => { console.log(err); res.status(err.statusCode).send(JSON.stringify({msg: err.msg})) })

})

/**
 * 
 * +-----------------+
 * | RESIDENCE OWNER |
 * +-----------------+
 */
app.post('/api/v1/resOwner/createResOwner', (req, res) => {

  th.tokenHandler(req)
  .then(_ => {
    if( _ ){
      const data = {...JSON.parse(req.body.data), ..._}
      actions.actions(res).createResOwner(data, req.files)
    } 
  })
  .catch(err => { console.log(err); res.status(err.statusCode).send(JSON.stringify({msg: err.msg})) })
 })

 app.get('/api/v1/resOwner/getByCity', (req, res) => {

  const city = req.query.city || ""
  actions.actions(res).getResidencesForCity(city)
  
 })

 app.get('/api/v1/resOwner/getAll', (req, res) => {

  th.tokenHandler(req)
  .then(transfData => {
    if(transfData) actions.actions(res).getAllResidenceOwners(transfData.userType)
  })
  .catch(err => { console.log(err); res.status(err.statusCode).send(JSON.stringify({msg: err.msg})) })
 })

 app.patch('/api/v1/resOwner/updateApproval/:claimId', (req, res) => {

  th.tokenHandler(req)
  .then(transfData => {
    if(transfData) actions.actions(res).approveResidenceOwner({adminId: transfData.userId, userType: transfData.userType, claimId: req.params.claimId, decision: transfData.decision})
  })
  .catch(err => { console.log(err); res.status(err.statusCode).send(JSON.stringify({msg: err.msg})) })
 })

app.listen(port, () => {
  console.log(`Host listening to port: ${port}`)
})
