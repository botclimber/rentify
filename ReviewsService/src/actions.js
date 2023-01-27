const conv = require("./convertLocation.js")
// Classes
const Db = require("./Db.js")
const addrInfo = require("./model/Address.js")
const Review = require("./model/Review.js")
const Location = require("./model/Location.js")

// ws is an array or list of clients
exports.actions = (function(ws){
	const DbInstance = new Db()

	const helper = {
		getReviews: (addressId, residenceData, unmappedReviews) => {
			const resFilterData = residenceData.filter(row => row.addressId == addressId)
			const reviewsFilterData = resFilterData.flatMap(row => unmappedReviews.filter( revRow => revRow.residenceId == row.id))

			return reviewsFilterData
		},
		defaultResp: (data, lat, lng) => {
			Promise.all([DbInstance.selectAll('Reviews'), DbInstance.selectAll('ResidenceAddresses'), DbInstance.selectAll('Addresses')])
			.then(allDataRes /* 3 arrays of dictionary */=> {
				console.log(allDataRes)
				// logic goes here
				const assembleData = allDataRes[2].map(row => {
					return new Location(row.lat, row.lng, helper.getReviews(row.id, allDataRes[1], allDataRes[0]))
				})

				const response = {
					type: data.type,
					address: {lat: lat, lng: lng},
					locations: assembleData // TODO: implemnet transform method
				}
				console.log(response)

				ws.forEach((client) => {
					 client.send(JSON.stringify(response));
				});
			})
			.catch(err => console.log(err))

		},
		createReview: (lat, lng, data) => {
			// TODO: change logic
			//var address = new Address(data.city, data.street, data.buildingNumber, data.nrFloor, data.nrSide, lat, lng)
			//var review = new R.Review(address, data.nrReview, data.nrAnon, data.nrRating)

			//Reviews.addReview(review)

			this.defaultResp(data, lat, lng)

		}
	}

	// ACTION TO SEARCH FOR ADDRESS
	function search(data){
		console.info("Starting address action for "+JSON.stringify(ws)+" client containing following data: "+JSON.stringify(data))

		conv.getLatLng(data)
        .then(res => {

					console.info("Getting all reviews ...")
					helper.defaultResp(data, res[0].latitude, res[0].longitude)

        }).catch( reason => {

					console.log("Couldnt handle request "+reason)
					ws.forEach((client) => {
						 client.send(JSON.stringify({status: "rejected",msg: reason}));
					});
        });
	}

	// ACTION TO INSERT/CREATE NEW REVIEW
	function insertReview(data){

		if(data.lat !== "" && data.lng !== ""){
			console.info("Use of defined lat, lng ("+data.lat+", "+data.lng+")")
			helper.createReview(data.lat, data.lng, data)

		}else{
			console.info("Lat and Lng not defined ... requesting it by using address ("+data.city+", "+data.street+", "+data.buildingNumber+")")
			conv.getLatLng(data)
			.then(res => helper.createReview(res[0].latitude, res[0].longitude, data))
			.catch( reason => {

				console.log(reason)
				ws.forEach((client) => {
					 client.send(JSON.stringify({status: "rejected",msg: reason}));
				});
			});
		}
	}

	return { search, insertReview }

})
