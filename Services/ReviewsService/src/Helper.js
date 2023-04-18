const Db = require("./Db.js")
const date = require('date-and-time')
const Location = require('./model/Location.js')
const addrInfo = require('./model/Address.js')
const Reviews = require('./model/Review.js')

module.exports = class Helper extends Db{
	constructor(ws){
		super()
		this.ws = ws
	}

	// get ResidenceAddress for specific Address
	/**
	 *
	 * @param {*} addressId
	 * @param {*} residenceData
	 * @returns
	 */
	getResForA(addressId, residenceData){
		console.log("Getting all RESIDENCES for addressId: "+addressId)
		return residenceData.filter(row => row.addressId == addressId)
	}

	// get Reviews for specific residenceAddress
	/**
	 *
	 * @param {*} addressId
	 * @param {*} residences
	 * @param {*} unmappedReviews
	 * @returns
	 */
	getRevForRA(addressId, residences, unmappedReviews){
		console.log("Getting all REVIEWS for addressId: "+addressId)
		const reviewsFilterData = residences.flatMap(row => unmappedReviews.filter( revRow => revRow.residenceId == row.id))

		return reviewsFilterData

    }

	// returns a promise with all reviews, addresses and residenceAddresses
	/**
	 *
	 * @returns
	 */
	getAllFromDb(){
		console.log("Getting needed data from DB and Resolving promise ...")
		const allDataPromise = Promise.all([this.selectAll('Reviews'), this.selectAll('ResidenceAddresses'), this.selectAll('Addresses')])

		return allDataPromise
	}

	// create Location data types data which is transformed and orginzed data
	/**
	 *
	 * @param {*} addresses
	 * @param {*} residenceAddresses
	 * @param {*} reviews
	 * @returns
	 */
	generateLocations(addresses, residenceAddresses, reviews){
		console.log("Assembling location data ...")
		return addresses.map(row => {
			const residences = this.getResForA(row.id, residenceAddresses)
			return new Location(row.lat, row.lng, residences, this.getRevForRA(row.id, residences, reviews))
		})
	}

	/**
	 * Some common response format
	 *
	 * @param {object} data
	 * @param {number} lat
	 * @param {number} lng
	 */
	defaultResp(data, lat, lng){
		this.getAllFromDb()
		.then(allDataRes /* 3 arrays of dictionary */=> {
			
			const isApproved = parseInt(data.onlyAppr)
			const rev = (isApproved)? allDataRes[0].filter(row => row.approved === 1) : allDataRes[0]

			// logic goes here
			const assembleData = this.generateLocations(allDataRes[2], allDataRes[1], rev).map(location =>{ location.transform(); return location})
			console.log(assembleData)
			console.log("Mounting response ...")
			const response = {
				type: data.type,
				address: {lat: parseFloat(lat), lng: parseFloat(lng)},
				locations: assembleData
			}

			console.log("Sending response to client ...")
			this.returnResponse(response)

		})
		.catch(err => console.log(err))
	}

	/**
	 *
	 * @param {*} lat
	 * @param {*} lng
	 * @param {*} data
	 */
	createReview(lat, lng, data){
		const call = (addrId) => {
			const residenceAddresses = new addrInfo.ResidenceAddresses(addrId, data.nrFloor, data.nrSide)
			const residenceId = this.insert(residenceAddresses)

			residenceId
			.then(resId => {

				const appr = (data.flag != "fromMapClick")? 1: 0;
				const review = new Reviews(data.userId, data.userName, data.userImage, resId, data.nrReview, data.nrRating, data.nrAnon, appr)
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
				console.log("Address with id: "+res[0].id+" already registed ...")
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

	/**
	 *
	 * @param {*} response
	 */
	returnResponse(response){ this.ws.status(200).send(JSON.stringify(response)); }

	changeReviewApprovalState(adminId, revId, state){
		const chgConfig = {tableName: 'Reviews', id: revId, columns: ['adminId', 'approved','approvedOn'], values: [adminId, state, date.format(new Date(), "YYYY/MM/DD HH:mm:ss")]}
		this.update(chgConfig)
		.then(res => console.log(res+" row changed!"))
		.catch(err =>{
			 console.log(err)
			ws.status(500).send(JSON.stringify({msg: 'something went wrong'}));
		})

	}
}
