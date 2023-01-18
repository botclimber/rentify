/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@google/markerclustererplus';


const apiOptions = {
  apiKey: "AIzaSyBq2YyQh70n_M6glKgr3U4a9vCmY5LU0xQ"
}

// ------------ websocket connection --------------
var location =function(city = "", street = "", nr = "", floor = "", side = ""){
	return {type: "address", city: city, street: street, buildingNumber: nr, floor: floor, side: side }
}

const socket = new WebSocket('ws://localhost:8000/');

var locations = {}
var data = {
	address: {lat: 41.1579438, lng:-8.629105299999999}
}

var map
var markers = []

var iCity = document.getElementById("iCity")
var iStreet = document.getElementById("iStreet")
var iBNumber = document.getElementById("iBNumber")

var nrCity = document.getElementById("nrCity")
var nrStreet = document.getElementById("nrStreet")
var nrBNumber = document.getElementById("nrBNumber")
var nrLat = document.getElementById("nrLat")
var nrLng = document.getElementById("nrLng")
var nrFloor = document.getElementById("nrFloor")
var nrSide = document.getElementById("nrSide")
var nrRating = document.getElementById("nrRating")
var nrAnon = document.getElementById("nrAnon")
var nrReview = document.getElementById("nrReview")
var newReview = document.getElementById("newReview")

const loader = new Loader(apiOptions)
loader.load().then(() => {
	map = displayMap(data.address);
	markers = addMarkers(map, locations);
});

socket.onopen = function(e) {
    console.log("[open] Connection established");
    console.log("Sending to server");

	const urlParams = new URLSearchParams(window.location.search)
	socket.send(JSON.stringify(location(urlParams.get('city'))));
};

socket.onerror = function(error) {
   console.log(`[error]`);
};


socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);
    //document.getElementById("resp").innerHTML += event.data+"<br>"

	var data = JSON.parse(event.data)
	var locations = data.locations

	if(data.type == "address") map = displayMap(data.address);

	// Configure the click listener.
	map.addListener("click", (mapsMouseEvent) => {
		alert("Place registed! Complete Form and add review")
		var coords = mapsMouseEvent.latLng.toJSON()

		console.log(coords)
		nrLat.value = coords.lat
		nrLng.value = coords.lng

		nrCity.value = iCity.value
		nrStreet.value = iStreet.value
		nrBNumber.value = iBNumber.value
		document.getElementById("myForm").style.display = "block";
	});

  	markers = (data.type == "address")? addMarkers(map, locations) : addMarkers(map, locations, markers[0]);
	//clustering marks is a bit buggy so lets remove it for now
	//clusterMarkers(map, markers[0]);
	addPanToMarker(map, markers[0], markers[1]);

};

document.getElementById("sAddress").onclick = function(){

	socket.send(JSON.stringify(location(iCity.value, iStreet.value, iBNumber.value)))
}


/* NEW REVIEW */
newReview.addEventListener('click', (event) => {

	if(nrCity.value !=="" && nrStreet.value !=="" && nrBNumber.value !=="" && nrReview.value !==""){
		var nReview = {
			type: "createReview",
			lat: nrLat.value,
			lng: nrLng.value,
			city: nrCity.value,
			street: nrStreet.value,
			buildingNumber: nrBNumber.value,
			nrFloor: nrFloor.value,
			nrSide: nrSide.value,
			nrRating: nrRating.value,
			nrAnon: nrAnon.value,
			nrReview: nrReview.value
		}

		console.log("ANON VALUE: "+nrAnon.value)
		socket.send(JSON.stringify(nReview))
	}
});
/* NEW REVIEW*/


/*	socket.onclose = function(event) {
		if (event.wasClean) {
			console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
		} else {
			// e.g. server process killed or network down
			// event.code is usually 1006 in this case
			console.log('[close] Connection died');
		}
	};*/
// ------------ websocket connection --------------

function isInputsFilled(){
	return (iCity.value !== "" && iStreet.value !== "" && iBNumber.value !== "")
}

const formBtn = document.getElementById("openNReviewForm")
iCity.addEventListener('focusout', (event) => {

	if(isInputsFilled()) formBtn.style.display=""
	else formBtn.style.display="none"

})

iStreet.addEventListener('focusout', (event) => {

	if(isInputsFilled()) formBtn.style.display=""
	else formBtn.style.display="none"

})

iBNumber.addEventListener('focusout', (event) => {

	if(isInputsFilled()) formBtn.style.display=""
	else formBtn.style.display="none"

})
nrAnon.addEventListener('change', (event) => {

	switch(nrAnon.value){
		case "true": nrAnon.value = "false"; break;
		case "false": nrAnon.value = "true"; break;
	}

})

document.getElementById("openNReviewForm").onclick = function(){
	nrCity.value = iCity.value
	nrStreet.value = iStreet.value
	nrBNumber.value = iBNumber.value

	nrLat.value = ""
	nrLng.value = ""

	document.getElementById("myForm").style.display = "block";
}

document.getElementById("closeNReviewForm").onclick = function(){
	document.getElementById("myForm").style.display = "none";
}


function displayMap(cityCoords) {
  const mapOptions = {
    // change here city coords
    	center: { lat: cityCoords.lat, lng: cityCoords.lng },

	// zoom must be adapted to user search
	/* TODO:
	if searching for a specific street zoom in
	if searching for city zoom out

	*/
	 zoom: 20

    //mapId: 'YOUR_MAP_ID'
  };
  const mapDiv = document.getElementById('map');
  return new google.maps.Map(mapDiv, mapOptions);
}

function addMarkers(map, locations, toRemoveMarkers = []) {

  //remove all markers
  for(let mark of toRemoveMarkers){
    console.log("TRACE 27: "+mark)
    mark.setMap(null) }

  /*const locations = {
    operaHouse: { lat: -33.8567844, lng: 151.213108 },
    tarongaZoo: { lat: -33.8472767, lng: 151.2188164 },
    manlyBeach: { lat: -33.8209738, lng: 151.2563253 },
    hyderPark: { lat: -33.8690081, lng: 151.2052393 },
    theRocks: { lat: -33.8587568, lng: 151.2058246 },
    circularQuay: { lat: -33.858761, lng: 151.2055688 },
    harbourBridge: { lat: -33.852228, lng: 151.2038374 },
    kingsCross: { lat: -33.8737375, lng: 151.222569 },
    botanicGardens: { lat: -33.864167, lng: 151.216387 },
    museumOfSydney: { lat: -33.8636005, lng: 151.2092542 },
    maritimeMuseum: { lat: -33.869395, lng: 151.198648 },
    kingStreetWharf: { lat: -33.8665445, lng: 151.1989808 },
    aquarium: { lat: -33.869627, lng: 151.202146 },
    darlingHarbour: { lat: -33.87488, lng: 151.1987113 },
    barangaroo: { lat: - 33.8605523, lng: 151.1972205 }
  }*/
  const markers = [];
  const reviews = [];
  for (const location in locations) {

    const markerOptions = {
      map: map,
      position: locations[location],
      icon: './img/custom_pin.png'
    }

    const marker = new google.maps.Marker(markerOptions);
    markers.push(marker);
    reviews.push(locations[location].reviews)
  }

  return [markers, reviews];
}

/*function clusterMarkers(map, markers) {
  const clustererOptions = { imagePath: './img/m' };
  const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
}*/


function addPanToMarker(map, markers, reviews) {
  let circle;
  var infoWindow = new google.maps.InfoWindow();

  markers.map( (marker, idx) => {
    marker.addListener('click', event => {
      //const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };

      infoWindow.setContent("<div style = 'width:500px;min-height:40px'>" + reviews[idx] + "</div>");
      infoWindow.open(map, marker);

    });
  });
}

function drawCircle(map, location) {
  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    map: map,
    center: location,
    radius: 800
  }
  const circle = new google.maps.Circle(circleOptions);
  return circle;
}
