const geo = require("node-geocoder")

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: process.env.API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: 'json' // 'gpx', 'string', ...
};

var geocoder = geo(options);

/*
function which converts text location to lat and lng
it is smart enought to figure it out if we are trying to get a city or specific location lat&lng

*/
exports.getLatLng = async function(address){

	var city = address.city || "Porto"
	var street = address.street || ""
	var bNumber = address.buildingNumber || ""	
	var rAddress = city+", "+street+" "+bNumber || address.city || "Porto"

	console.log(rAddress)
	var res = await geocoder.geocode(rAddress)
	
	return res 
}
