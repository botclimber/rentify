module.exports = class Locations {
  constructor(lat, lng, reviews){
    this.lat = lat
    this.lng = lng
    this.reviews = this.#transform(reviews) // array of reviews
  }

  #transform(reviews){
    // "view" 
    return reviews
  }
}
