module.exports = class Locations {
  constructor(lat, lng, residences, reviews){
    this.lat = lat
    this.lng = lng
    this.residences = residences
    this.reviews = reviews // array of reviews
  }

  transform(){
  	const state = {
		0: "<b style='font-size:5pt;padding:5px;color:orange;'>pending ...</b>",
		1: "<b style='font-size:5pt;padding:5px;color:green;'>verified</b>",
		2: "<b style='font-size:5pt;padding:5px;color:red;'>rejected</b>"
	}

    // enchance this in order to return all needed data
    this.reviews = "<ul>"+this.reviews.map( comment => "<li>"+comment.review+ " "+state[comment.approved]+"</li>").join("")+"</ul>"
  }
  
}
