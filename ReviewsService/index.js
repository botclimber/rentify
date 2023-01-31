// server init goes here
const { Server } = require('ws');
const actions = require("./src/actions.js")
const sockserver = new Server({ port: process.env.PORT});
const connections = new Set();

sockserver.on('connection', (ws) => {
   console.log('New client connected!'+ws);
   connections.add(ws)

   ws.on('message', (data) => {
    const dataRec = JSON.parse(data);

  	console.log(dataRec)
  	var action = dataRec.type || "search"

  	switch(action){
  		case "search": actions.actions([ws]).search(dataRec); break;
  		case "createReview": actions.actions([ws]).insertReview(dataRec); break;
      
      // TODO: some admin dedicated requests 
  	}
   });

  ws.on('close', () => {
    connections.delete(ws);
    console.log('Client has disconnected!');
  });
});
