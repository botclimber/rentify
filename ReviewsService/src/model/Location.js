module.exports = class Locations {
  constructor(lat, lng, reviews){
    this.lat = lat
    this.lng = lng
    this.reviews = this.#transform(reviews) // array of reviews
  }

  #transform(reviews){
   
	// enchance this in order to return all needed data 
	const transformedReviews = "<ul>"+reviews.map( comment => "<li>"+comment.review+ "</li>").join("")+"</ul>"
	return transformedReviews
  }
}
