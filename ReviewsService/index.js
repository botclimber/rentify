// server init goes here
const { Server } = require('ws');

const Address = require("./src/Address.js")
const R = require("./src/Reviews.js")
const Reviews = new R.Reviews()

const sockserver = new Server({ port: 8000});
const connections = new Set();
const conv = require("./src/convertLocation.js")

sockserver.on('connection', (ws) => {
   console.log('New client connected!');
   connections.add(ws)

   ws.on('message', (data) => {
    const dataRec = JSON.parse(data);

		conv.getLatLng(dataRec)
		.then(res => {

		console.log(res)

		if(dataRec.type == "createReview"){
			// creating new review record
			var address = new Address(dataRec.city, dataRec.street, dataRec.buildingNumber, dataRec.nrFloor, dataRec.nrSide, res[0].latitude, res[0].longitude)
			var review = new R.Review(address, dataRec.nrReview, dataRec.nrAnon, dataRec.nrRating)

			Reviews.addReview(review)

			var allReviews = Reviews.getAll()
			console.log(allReviews)

			var response = {
				type: dataRec.type,
				locations: JSON.parse(allReviews.locations())
			}

			connections.forEach((client) => {
				 client.send(JSON.stringify(response));
			});

		}else {

			var allReviews = Reviews.getAll()
			console.log(allReviews)

			var response = {
				type: dataRec.type,
				address: {lat: res[0].latitude, lng: res[0].longitude},
				locations: JSON.parse(allReviews.locations())
			}

			ws.send(JSON.stringify(response));
		}
		}).catch( reason => {

		console.log(reason)
		ws.send(JSON.stringify({status: "rejected",msg: reason}));
		});
   });

  ws.on('close', () => {
    connections.delete(ws);
    console.log('Client has disconnected!');
  });
});
