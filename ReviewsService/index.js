// server init goes here
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const actions = require("./src/actions.js")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
})

app.get('/api/v1/search', (req, res) => {
  const address = {city: req.query.city || "Porto", street: req.query.street || "", buildingNumber: req.query.nr || ""}
  actions.actions(res).search(address)
})

app.get('/api/v1/reviews', (req, res) => {
  actions.actions(res).getAllReviews()
})

// needs token/auth ----
// implement handle of token
app.post('/api/v1/create', (req, res) => {
  actions.actions(res).insertReview(req.body)
})

app.patch('/api/v1/updateReview/:revId', (req, res) => {
  actions.actions(res).updateReviewState({revId: req.params.revId, decision: req.body.decision})
})
// ---------

app.listen(port, () => {
  console.log(`Host listening to port: ${port}`)
})