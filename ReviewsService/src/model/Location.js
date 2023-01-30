module.exports = class Locations {
  constructor(lat, lng, reviews){
    this.lat = lat
    this.lng = lng
    this.reviews = this.#transform(reviews) // array of reviews
  }

  #transform(reviews){
  	const state = {
		0: "<b style='font-size:5pt;padding:5px;color:orange;'>pending ...</b>",
		1: "<b style='font-size:5pt;padding:5px;color:green;'>verified</b>"
	}

	// enchance this in order to return all needed data
	const transformedReviews = "<ul>"+reviews.map( comment => {

	return "<li>"+comment.review+ " "+state[comment.approved]+"</li>"

	}).join("")+"</ul>"

	return transformedReviews
  }
}
