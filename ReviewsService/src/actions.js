const conv = require("./convertLocation.js")
// Classes
const Db = require("./Db.js")
const addrInfo = require("./model/Address.js")
const Reviews = require("./model/Review.js")
const Location = require("./model/Location.js")

class Helper extends Db{
	constructor(ws){
		super()
		this.ws = ws
	}

	getReviews(addressId, residenceData, unmappedReviews){
		console.log("Getting all reviews for specific addressId: "+addressId)
		const resFilterData = residenceData.filter(row => row.addressId == addressId)
		const reviewsFilterData = resFilterData.flatMap(row => unmappedReviews.filter( revRow => revRow.residenceId == row.id))

		return reviewsFilterData
	}

	defaultResp(data, lat, lng){
		console.log("Getting needed data from DB and Resolving promise ...")
		Promise.all([this.selectAll('Reviews'), this.selectAll('ResidenceAddresses'), this.selectAll('Addresses')])
		.then(allDataRes /* 3 arrays of dictionary */=> {

			// logic goes here
			console.log("Assembling data ...")
			const assembleData = allDataRes[2].map(row => {
				return new Location(row.lat, row.lng, this.getReviews(row.id, allDataRes[1], allDataRes[0]))
			})

			console.log("Mounting response ...")
			const response = {
				type: data.type,
				address: {lat: parseFloat(lat), lng: parseFloat(lng)},
				locations: assembleData // TODO: implemnet transform method
			}

			console.log("Sending response to client ...")
			this.ws.forEach((client) => {
				 client.send(JSON.stringify(response));
			});
		})
		.catch(err => console.log(err))

	}

	createReview(lat, lng, data){
		const call = (addrId) => {
			const residenceAddresses = new addrInfo.ResidenceAddresses(addrId, data.nrFloor, data.nrSide)
			const residenceId = this.insert(residenceAddresses)

			residenceId
			.then(resId => {
				const review = new Reviews(1, resId, data.nrReview, data.nrRating, data.nrAnon)
				this.insert(review)
				.then( _ => this.defaultResp(data, lat, lng) )
				.catch(err => console.log(err))

			})
			.catch(err => console.log(err))
		}

		//Reviews.addReview(review)
		this.exists({tableName: "Addresses", columns: ["lat", "lng"], values: [lat, lng], operator: "and"})
		.then(res => {

			if(res.length) { // for this case if existing, expects only one record
				console.log("Address already registed ...")
				call(res[0].id)

			}else{
				console.log("None existing address, registering it ...")
				const newAddress = new addrInfo.Addresses(lat, lng, data.city, data.street, data.buildingNumber, data.postalCode, data.country)
				this.insert(newAddress)
				.then(addressId => call(addressId))
				.catch(err => console.log(err))

			}
		})
		.catch(err => console.log(err))

	}
}

// ws is an array or list of clients
exports.actions = (function(ws){
	const helper = new Helper(ws)

	// ACTION TO SEARCH FOR ADDRESS
	function search(data){
		console.info("Starting search action for "+JSON.stringify(ws)+" client containing following data: "+JSON.stringify(data))

		conv.getLatLng(data)
			.then(res => {

					console.info("Assembling default response ...")
					helper.defaultResp(data, res[0].latitude, res[0].longitude)

			}).catch(reason => {

				console.log("Couldnt handle request " + reason)
				ws.forEach((client) => {
					client.send(JSON.stringify({ status: "rejected", msg: reason }));
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
		}
	}

	return { search, insertReview }

})
