
const date = require('date-and-time')

module.exports = class Reviews {
  constructor(userId, residenceId, review, rating, anon){

	this.userId = userId
	this.adminId = 0
	this.residenceId = residenceId
	this.review = review
	this.rating = parseInt(rating) || 1
	this.createdOn = date.format(new Date(), "YYYY/MM/DD HH:mm:ss");
	this.approvedOn = "1000-01-01";
	this.anonymous = anon
	this.approved = 0
	}
}
