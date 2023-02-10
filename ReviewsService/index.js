// server init goes here
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
const port = process.env.PORT

const actions = require("./src/actions.js")

app.get('/search', (req, res) => {
  const address = {city: req.query.city || "Porto", street: req.query.street || "", buildingNumber: req.query.nr || ""}
  actions.actions(res).search(address)
})

app.post('/create', (req, res) => {
  actions.actions(res).insertReview(req.body)
})

// admin only requests (for now) ----
app.get('/api/adm/reviews', (req, res) => {
  actions.actions(res).getAllReviews()
})

app.patch('/api/adm/updateReview/:revId', (req, res) => {
  actions.actions(res).updateReviewState({revId: req.params.revId, decision: req.body.decision})
})

app.listen(port, () => {
  console.log(`Host listening to port: ${port}`)
})