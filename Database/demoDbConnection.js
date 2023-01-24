// small demo of a connection to the DB with:
// a Select statement in the Users table
// inser statement in Users table using city
const mysql = require('mysql2');
const addr = require('./Address.js')
const DB = require('./Db.js')

// testing purposes
/*exports.addUser = async function (city) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO Users (email, username, password, name) VALUES  ( "teste", "teste", "teste","${city}" )`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}*/
console.log(DB)
const db = new DB;
//const addresses = new Array(5).fill().map((_, key) => new addr(city = 'city '+key, street = 'street' + key, nr = 'nr '+key, floor = 'floor '+key, direction = 'dir '+key, lat = key, lng = key+1, postalCode = 'posCode '+key, country = 'country '+key))


// MULTIPLE INSERTS EXAMPLE
/*addresses.map(row => {
	console.info(row)
	db.insert(row)
	.then(res => console.log('returned ID: '+res))
	.catch(err => console.log(err))
})*/
var toTestWith = new addr(city = 'city drake', street = 'street drake', nr = 162, floor = 'floor drake', direction = 'dir drake', lat = 27, lng = 27, postalCode = 'posCode drake', country = 'country drake') 

// SINGLE INSERT EXAMPLE
db.insert(toTestWith)
.then(res => console.log('ID: '+res))
.catch(err => console.log(err))

// SELECT ALL EXAMPLE
db.selectAll('Addresses')
.then(res => {
	console.table(res)
})
.catch(err => console.log(err))

// UPDATE EXAMPLE
db.update({tableName: 'Addresses', id: 2, columns: ['city', 'street'], values: ['Travis Scott', 'sicko mode']})

// SELECT ONE EXAMPLE
db.selectOne('Addresses', 2)
.then(res => console.log('Single get: '+res.city))
.catch(err => console.log(err))

db.close()
