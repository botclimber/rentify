const conv = require("./convertLocation.js")
const Address = require("./modules/Address.js")
const R = require("./modules/Reviews.js")
const Reviews = new R.Reviews()

// ws is an array or list of clients
exports.actions = (function(ws){
	
	// ACTION TO SEARCH FOR ADDRESS
	function address(data){
		console.log(ws, data)
		conv.getLatLng(data)
                        .then(res => {

				var allReviews = Reviews.getAll()
				console.log(allReviews)

				var response = {
					type: data.type,
					address: {lat: res[0].latitude, lng: res[0].longitude},
					locations: JSON.parse(allReviews.locations())
				}

				ws.forEach((client) => {
					 client.send(JSON.stringify(response));
				});

                        }).catch( reason => {

				console.log(reason)
				ws.forEach((client) => {
					 client.send(JSON.stringify({status: "rejected",msg: reason}));
				});
                        });  
	}

	// ACTION TO INSERT/CREATE NEW REVIEW	
	function createReview(data){
		function run(lat,lng){

			// creating new review record
			var address = new Address(data.city, data.street, data.buildingNumber, data.nrFloor, data.nrSide, lat, lng)
			var review = new R.Review(address, data.nrReview, data.nrAnon, data.nrRating)

			Reviews.addReview(review)

			var allReviews = Reviews.getAll()
			console.log(allReviews)

			var response = {
				type: data.type,
				locations: JSON.parse(allReviews.locations())
			}

			ws.forEach((client) => {
				 client.send(JSON.stringify(response));
			});
		}

		if(data.lat !== "" && data.lng !== "") run(data.lat, data.lng)
		else{
			conv.getLatLng(data)
			.then(res => {

				console.log(res)
				run(res[0].latitude, res[0].longitude)

			}).catch( reason => {

				console.log(reason)
				ws.forEach((client) => {
					 client.send(JSON.stringify({status: "rejected",msg: reason}));
				});
			});
		}
	}

	return { address, createReview }

})
