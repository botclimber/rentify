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

	#sqlValuesTypeSafer = (value) => {
		console.log(value)
		switch (typeof(value)) {
			case 'string': return '"'+value+'"';break;
			default: return value

		}
	}

	// create hidden .env variables to do connection
	constructor(){

		this.con = mysql.createConnection({
		  host: "localhost",
		  user: "root"  , // switch to your current user
		  password: "greedisgood", // switch to your current password
		  database: "renReviews_db"
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

	/**
	TODO - change return state
	return value for this method should be the id from new created/inserted row

	@method insert
	@retrun unit
	*/
	insert(object) {
		console.log('Inserting data into '+object.constructor.name+'...')

		const columnNames = Object.keys(object).join(',')
		const values = Object.values(object).map(_ => this.#sqlValuesTypeSafer(_)).join(',')

		const sql = `INSERT INTO ${object.constructor.name} (${columnNames}) VALUES (${values})`;

		/* Maybe we can replace this with the functional approach above
		var columnNames = "";
	  var values = "";

		for (let [key, value] of Object.entries(object)) {
	    if (key === "id") continue // not sure if this will be really needed
	    columnNames += key + ",";
	    values += value + ",";
	  }

	  columnNames = columnNames.slice(0, -1);
	  values = values.slice(0, -1);
		*/

	  // restriction: class has same name as table
	  // another solution: have a property type which will refer to the table name

		console.log(columnNames)
		console.log(values)
		console.log(sql)

	  this.con.query(sql, [values], function (err, result) {
	    if (err) throw err;
	    console.log("record inserted "+ result);
	  });
	}

}
