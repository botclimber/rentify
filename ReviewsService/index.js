// server init goes here
const { Server } = require('ws');

const actions = require("./src/actions.js")

const sockserver = new Server({ port: process.env.PORT});
const connections = new Set();

sockserver.on('connection', (ws) => {
   console.log('New client connected!');
   connections.add(ws)

   ws.on('message', (data) => {
    const dataRec = JSON.parse(data);

  	console.log(dataRec)
  	var action = dataRec.type || "address"

  	switch(action){
  		case "address": actions.actions([ws]).address(dataRec); break;
  		//case "createReview": actions.actions([ws]).createReview(dataRec); break;
  	}
   });

  ws.on('close', () => {
    connections.delete(ws);
    console.log('Client has disconnected!');
  });
});
