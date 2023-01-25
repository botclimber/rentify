class Addresses {
  constructor(lat, lng, city, street, nr, postalCode, country){
    this.lat = lat
    this.lng = lng
    this.city = city
    this.street = street
    this.nr = nr
    this.postalCode = postalCode
    this.country = country
  }
}

class ResidenceAddresses{
	constructor(addrId, floor, direction){
		
		this.addressId = addrId
		this.floor = floor
		this.direction = direction
	}
}


module.exports = {Addresses, ResidenceAddresses} 
