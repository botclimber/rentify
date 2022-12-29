const geo = require("node-geocoder")

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBq2YyQh70n_M6glKgr3U4a9vCmY5LU0xQ', // for Mapquest, OpenCage, Google Premier
  formatter: 'json' // 'gpx', 'string', ...
};

var geocoder = geo(options);

exports.cityToLatLng = async function(city){
	var res = await geocoder.geocode(city)
	//console.log(city, res)
	
	return res 
}
