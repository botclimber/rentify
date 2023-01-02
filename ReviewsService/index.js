// server init goes here
const { Server } = require('ws');

const sockserver = new Server({ port: 8000});
const connections = new Set();
const conv = require("./convertLocation.js")

/*var reviews = {
id:
userId:
adminId:
residenceAddressId:
description:
rating:
date:
approvalDate:
anonymous:
approved:
}

var ResidenceAdress = {
id:
addressId:
floor:
direction:
number:
}

var Address = {
id:
lat:
lng:
streetName:
city:
state:
postalCode:
number:
country:
}*/

/* ------------ for test purposes -------------- */
var memory = [
{id:0, lat: -33.8567844, lng: 151.213108, review: "test 0"},
{id:1, lat: -33.8636005, lng: 151.2092542, review: "test 1"}
]

function buildContent(){
	var content = '{'

	for(x of memory){
		content += '"m'+x.id+'": {"lat":'+x.lat+',"lng": '+x.lng+', "reviews":"'+x.review+'"}'
		content += (x.id == memory[memory.length - 1].id)? '' : ','
	}
	content += '}'

	console.log(content)
	return content
}

/* ------------ for test purposes -------------- */

sockserver.on('connection', (ws) => {
   console.log('New client connected!');
   connections.add(ws)

   ws.on('message', (data) => {
       	const dataRec = JSON.parse(data);

	console.log(dataRec)

	if(dataRec.type == "createReview"){

		console.log(dataRec)
		// creating new review record
		memory.push({id: memory[memory.length -1].id + 1, lat: dataRec.lat, lng: dataRec.lng, review: dataRec.nrReview.replace(/[^\w\s]/gi, '')})

		console.log(memory)
		var response = {
			type: dataRec.type,
			locations: JSON.parse(buildContent())
		}

		connections.forEach((client) => {
		   client.send(JSON.stringify(response));
		});

	}else{

		conv.getLatLng(dataRec)
		.then(res => {

		console.log(res)

		var response = {
			type: "address",
			address: {lat: res[0].latitude, lng: res[0].longitude},
			locations: JSON.parse(buildContent())
		}

		ws.send(JSON.stringify(response));

		/*connections.forEach((client) => {
		   client.send(JSON.stringify());
	       })*/

	}).catch( reason => {

	console.log(reason)
	ws.send(JSON.stringify({status: "rejected",msg: reason}));
	});
	}
   });

   ws.on('close', () => {
       connections.delete(ws);
       console.log('Client has disconnected!');
   });
});
