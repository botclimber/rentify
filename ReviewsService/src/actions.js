const conv = require("./convertLocation.js")
const Address = require("./modules/Address.js")
const R = require("./modules/Reviews.js")
const Reviews = new R.Reviews()

// ws is an array or list of clients
exports.actions = (function(ws){

	// ACTION TO SEARCH FOR ADDRESS
	function address(data){
		console.info("Starting address action for "+ws+" client containing following data: "+data)
		conv.getLatLng(data)
        .then(res => {

					console.info("Getting all reviews ...")
					var allReviews = Reviews.getAll()
					console.log(allReviews)

					console.info("assembling response ...")
					var response = {
						type: data.type,
						address: {lat: res[0].latitude, lng: res[0].longitude},
						locations: JSON.parse(allReviews.locations())
					}
					console.log(response)

					console.log("sending response to client")
					ws.forEach((client) => {
						 client.send(JSON.stringify(response));
					});

        }).catch( reason => {

					console.log("Couldnt handle request "+reason)
					ws.forEach((client) => {
						 client.send(JSON.stringify({status: "rejected",msg: reason}));
					});
        });
	}

	// ACTION TO INSERT/CREATE NEW REVIEW
	function createReview(data){

		/**
		assembles response and send it to client

		@lat
		@lng
		*/
		function run(lat,lng){

			// creating new review record
			var address = new Address(data.city, data.street, data.buildingNumber, data.nrFloor, data.nrSide, lat, lng)
			var review = new R.Review(address, data.nrReview, data.nrAnon, data.nrRating)

			Reviews.addReview(review)

			var allReviews = Reviews.getAll()
			console.log(allReviews)

			var response = {
				type: data.type,
				address: {lat: parseFloat(lat), lng: parseFloat(lng)},
				locations: JSON.parse(allReviews.locations())
			}

			ws.forEach((client) => {
				 client.send(JSON.stringify(response));
			});
		}

		if(data.lat !== "" && data.lng !== ""){
			console.info("Use of defined lat, lng ("+data.lat+", "+data.lng+")")
			run(data.lat, data.lng)

		}else{
			console.info("Lat and Lng not defined ... requesting it by using address ("+data.city+", "+data.street+", "+data.buildingNumber+")")
			conv.getLatLng(data)
			.then(res => {

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
