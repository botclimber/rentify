const conv = require("./convertLocation.js")
// Classes
const Helper = require("./Helper.js")
const { filter } = require("rxjs/operators")

// ws is an array or list of clients
exports.actions = (function(ws){
	const helper = new Helper(ws)

	// ACTION TO SEARCH FOR ADDRESS
	function search(data){
		console.info("Starting search action for "+ws+" client containing following data: "+JSON.stringify(data))

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
			.then(res => {
				this.getPendingForApprovalReviews();
				helper.createReview(res[0].latitude, res[0].longitude, data); })
			.catch( reason => {

				console.log(reason)
				ws.forEach((client) => {
					 client.send(JSON.stringify({status: "rejected",msg: reason}));
				});
			});
		}
	}

	//ACTION TO SEND DATA FOR ADMIN PAGE
	function getPendingForApprovalReviews(){
		helper.getAllFromDb()
		.then(res => {
			console.log("assembling all pending reviews...")
			const pendReviews = res[0].filter(review => review.approved == 0)
			.map(rev => {
				const residence = res[1].find(res => res.id == rev.residenceId)
				const addr = res[2].find(address => address.id == residence.addressId)
				
				return {rev: rev, res: residence, addr: addr}
			}) // continue map tree constuction
			
			const response = {
				type: "pendingReviews",
				reviews: pendReviews
			}

			console.log(response)
			console.log("Sending response to client ...")
			helper.returnResponse(response)

		})
		.catch(err => console.log(err)) 

	}

	function updateReviewState(data){
		helper.changeReviewApprovalState(data.revId, data.decision)
		this.getPendingForApprovalReviews()	

	}

	return { search, insertReview, getPendingForApprovalReviews, updateReviewState }

})
