



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
  console.log("We here")
  actions.actions(res).getAllReviews()
})

app.patch('/api/adm/updateReview/:revId', (req, res) => {
  actions.actions(res).updateReviewState({revId: req.params.revId, decision: req.body.decision})
})

app.listen(port, () => {
  console.log(`Host listening to port: ${port}`)
})


/*

const { Server } = require('ws');

const sockserver = new Server({ port: process.env.PORT});
const connections = [];


sockserver.on('connection', (ws) => {
   console.log('New client connected!'+ws);
   connections.push(ws)

   ws.on('message', (data) => {
    const dataRec = JSON.parse(data);

  	console.log(dataRec)
  	var action = dataRec.type || "search"

  	switch(action){
  		case "search": actions.actions([ws]).search(dataRec); break;
  		case "createReview": actions.actions([ws]).insertReview(dataRec); break;

      // TODO: some admin dedicated requests
      case "pendingReviews": actions.actions([ws]).getPendingForApprovalReviews(); break;
	    case "updateReview": actions.actions([ws]).updateReviewState(dataRec); break;
  	}
   });

  ws.on('close', () => {
    connections.splice(connections.indexOf(ws));
    console.log('Client has disconnected!');
  });
});

*/