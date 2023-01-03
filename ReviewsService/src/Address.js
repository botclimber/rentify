module.exports = class Address {
  constructor(city, street, nr, floor, direction, lat, lng){
    this.city = city
    this.street = street
    this.nr = nr
    this.floor = floor
    this.direction = direction
    this.coords = {lat: lat, lng: lng}
  }

}
