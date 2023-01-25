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
		switch (typeof(value)) {
			case 'string': return '"'+value+'"';break;
			default: return value

		}
	}

	// create hidden .env variables to do connection
	constructor(){

		this.con = mysql.createConnection({
		  host: "localhost",
		  user: process.DB_USER  , // switch to your current user
		  password: process.DB_PASSWORD, // switch to your current password
		  database: process.DB_NAME,
		  waitForConnections: true
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


	/**
	return value for this method should be the id from new created/inserted row

	@method insert
	@retrun unit
	*/
	async insert(object) {
		console.log('Inserting data into '+object.constructor.name+'...')

		const columnNames = Object.keys(object).join(',')
		const values = Object.values(object).map(_ => this.#sqlValuesTypeSafer(_)).join(',')

		const sql = `INSERT INTO ${object.constructor.name} (${columnNames}) VALUES (${values})`;

		const res = await this.con.promise().execute(sql);
		return res[0].insertId
	}


	/**
	@tableName: String
	*/
	async selectAll(tableName){
		console.log('Getting all data from '+tableName+'...')

		const sql = 'SELECT * FROM '+tableName

		const res = await this.con.promise().execute(sql)
		return res[0]
	}

	async selectOne(tableName, id){

		console.log('Getting data from '+tableName+' where id is '+id)

		const sql = 'SELECT * FROM '+tableName+' WHERE id = ?'

		const res = await this.con.promise().execute(sql, [id])
		return res[0][0]
	}


	/**
	@chgConfig= {tableName: ,id: , columns: [], values: []} :object
	@return void
	*/
	async update(chgConfig){

		console.log('Updating data on table '+chgConfig.tableName)

		const toBeUpdated = chgConfig.columns.map( (value, key) => value+'='+this.#sqlValuesTypeSafer(chgConfig.values[key])).join()
		const sql = 'UPDATE '+chgConfig.tableName+' SET '+toBeUpdated+' WHERE id = '+chgConfig.id

		const res = await this.con.execute(sql, function(err, result){
			if(err) throw err;
			else console.log(result.changedRows+" row(s) updated")
		})

	}

	/**
	we should think about what we really want to delete
	*/
	//del(){}

	close(){
		this.con.end(function(err){
			if(err) throw err;
			console.log("Connection closed!");
		})
	}
}
