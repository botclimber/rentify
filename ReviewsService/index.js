// server init goes here
const { Server } = require('ws');

const sockserver = new Server({ port: 8000});
const connections = new Set();

sockserver.on('connection', (ws) => {
   console.log('New client connected!');
   connections.add(ws)
   ws.on('message', (data) => {
        var locations = {
          type: "locations",
          locations: {
          test0: { lat: -33.8567844, lng: 151.213108, reviews: '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">test 0</h1>' +
    '<div id="bodyContent">'+
    "<ul>" +
    "<li>review 0</li>" +
    "<li>review 1</li>" +
    "<li>review 2</li>" +
    "<li>review 3</li>" +
    "<li>review 4</li>" +
    "</ul>" +
    "</div>" +
    "</div>" },
          test1: { lat: -33.8472767, lng: 151.2188164, reviews: '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">test 1</h1>' +
    '<div id="bodyContent">'+
    "<ul>" +
    "<li>review 0</li>" +
    "<li>review 1</li>" +
    "<li>review 2</li>" +
    "<li>review 3</li>" +
    "<li>review 4</li>" +
    "</ul>" +
    "</div>" +
    "</div>" },
          test2: { lat: -33.8209738, lng: 151.2563253, reviews: '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">test 2</h1>' +
    '<div id="bodyContent">'+
    "<ul>" +
    "<li>review 0</li>" +
    "<li>review 1</li>" +
    "<li>review 2</li>" +
    "<li>review 3</li>" +
    "<li>review 4</li>" +
    "</ul>" +
    "</div>" +
    "</div>" },
          test3: { lat: -33.8690081, lng: 151.2052393, reviews: '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">test 3</h1>' +
    '<div id="bodyContent">'+
    "<ul>" +
    "<li>review 0</li>" +
    "<li>review 1</li>" +
    "<li>review 2</li>" +
    "<li>review 3</li>" +
    "<li>review 4</li>" +
    "</ul>" +
    "</div>" +
    "</div>" },
          test4: { lat: -33.8587568, lng: 151.2058246, reviews: '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">test 4</h1>' +
    '<div id="bodyContent">'+
    "<ul>" +
    "<li>review 0</li>" +
    "<li>review 1</li>" +
    "<li>review 2</li>" +
    "<li>review 3</li>" +
    "<li>review 4</li>" +
    "</ul>" +
    "</div>" +
    "</div>" },
          test5: { lat: -33.858761, lng: 151.2055688, reviews: '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">test 5</h1>' +
    '<div id="bodyContent">'+
    "<ul>" +
    "<li>review 0</li>" +
    "<li>review 1</li>" +
    "<li>review 2</li>" +
    "<li>review 3</li>" +
    "<li>review 4</li>" +
    "</ul>" +
    "</div>" +
    "</div>" },
          test6: { lat: -33.852228, lng: 151.2038374, reviews: '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">test 6</h1>' +
    '<div id="bodyContent">'+
    "<ul>" +
    "<li>review 0</li>" +
    "<li>review 1</li>" +
    "<li>review 2</li>" +
    "<li>review 3</li>" +
    "<li>review 4</li>" +
    "</ul>" +
    "</div>" +
    "</div>" },
          test7: { lat: -33.8737375, lng: 151.222569, reviews: '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">test 7</h1>' +
    '<div id="bodyContent">'+
    "<ul>" +
    "<li>review 0</li>" +
    "<li>review 1</li>" +
    "<li>review 2</li>" +
    "<li>review 3</li>" +
    "<li>review 4</li>" +
    "</ul>" +
    "</div>" +
    "</div>" }
        }
      };

       const dataRec = JSON.parse(data);

       connections.forEach((client) => {
           client.send(JSON.stringify(locations));
       })

   });

   ws.on('close', () => {
       connections.delete(ws);
       console.log('Client has disconnected!');
   });
});
