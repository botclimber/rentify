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
          test0: { lat: -33.8567844, lng: 151.213108 },
          test1: { lat: -33.8472767, lng: 151.2188164 },
          test2: { lat: -33.8209738, lng: 151.2563253 },
          test3: { lat: -33.8690081, lng: 151.2052393 },
          test4: { lat: -33.8587568, lng: 151.2058246 },
          test5: { lat: -33.858761, lng: 151.2055688 },
          test6: { lat: -33.852228, lng: 151.2038374 },
          test7: { lat: -33.8737375, lng: 151.222569 }
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
