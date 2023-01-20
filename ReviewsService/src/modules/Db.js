/*
INSERT EXAMPLE:

var sql = `INSERT INTO Addresses (lat, lng, city, street, nr, state, postalCode, country) VALUES  ( 14, 12, "test2","test3","test4","test5","test6","test7" )`;
this.con.query(sql, function (err, result) {
	if (err) throw err;
	console.log(result)
	console.log("1 record inserted");
});

*/
var mysql = require('mysql2');

module.exports = class DB{

	// create hidden .env variables to do connection
	constructor(){

		this.con = mysql.createConnection({
		  host: "localhost",
		  user: process.env.DB_USER , // switch to your current user
		  password: process.env.DB_PASSWORD, // switch to your current password
		  database: process.env.DBNAME
		});

		// test connection
		this.connect()

	}

	connect(){

		this.con.connect(function (err) {
	    		if (err) throw err;
	    		console.log("Connected to DB!");
	  	});
	}

	/* TODO:
	- generic CRUD methods
	*/

}
