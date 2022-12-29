// server init goes here
const { Server } = require('ws');

const sockserver = new Server({ port: 8000});
const connections = new Set();
const conv = require("./convertLocation.js")

var revMsg = '<div id="content">' +
'<div id="siteNotice">' +
"</div>" +
'<h1 id="firstHeading" class="firstHeading">Reviews</h1>' +
'<div id="bodyContent">'+
"<ul>" +
"<li>review 0</li>" +
"<li>review 1</li>" +
"<li>review 2</li>" +
"<li>review 3</li>" +
"<li>review 4</li>" +
"</ul>" +
"</div>" +
"</div>";

sockserver.on('connection', (ws) => {
   console.log('New client connected!');
   connections.add(ws)
   ws.on('message', (data) => {
       	const dataRec = JSON.parse(data);

	const coords = conv.cityToLatLng(dataRec.city)
	coords.then(res => {

	var locations = {
          type: "locations",
	  city: {lat: res[0].latitude, lng: res[0].longitude}, 
          locations: {
          test0: { lat: -33.8567844, lng: 151.213108, reviews:revMsg  },
          test1: { lat: -33.8472767, lng: 151.2188164, reviews: revMsg },
          test2: { lat: -33.8209738, lng: 151.2563253, reviews: revMsg },
          test3: { lat: -33.8690081, lng: 151.2052393, reviews: revMsg },
          test4: { lat: -33.8587568, lng: 151.2058246, reviews: revMsg },
          test5: { lat: -33.858761, lng: 151.2055688, reviews: revMsg },
          test6: { lat: -33.852228, lng: 151.2038374, reviews: revMsg },
          test7: { lat: -33.8737375, lng: 151.222569, reviews: revMsg }
        }
      };
	
       /*connections.forEach((client) => {
           client.send(JSON.stringify(locations));
       })*/

	ws.send(JSON.stringify(locations));
	})	
   });

   ws.on('close', () => {
       connections.delete(ws);
       console.log('Client has disconnected!');
   });
});
