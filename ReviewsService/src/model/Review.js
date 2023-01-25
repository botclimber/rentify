module.exports = class Review {
  constructor(userId, residenceId, review, rating, anon){

	this.userId = userId
	this.adminId = 0
	this.residenceId = residenceId
	this.review = review
	this.rating = rating
	this.createdOn = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
	this.approvedOn = "0000-00-00";
	this.anonymous = anon
	this.approved = false
  }
}
