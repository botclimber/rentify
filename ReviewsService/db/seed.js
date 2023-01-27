const mysql = require("mysql2")
const fs = require("fs")
const seedSql = fs.readFileSync("db/seedDiffUC.sql", {
	encoding: "utf-8"
})

/**
@seed | generates some data for tables Addresses, ResidenceAddresses and Reviews

@param {int} lastId | when seeding no empty table check what is the last ID
@note: Maybe it would be nice if we could create some struture to generate random between given range foreach table column
*/
const seed = (lastId = 0) => new Array(10).fill().map((_, key) => [
"INSERT INTO Addresses(lat,lng,city,street,nr,postalCode,country)VALUES( 1.0, 1.0, 'city "+key+"', 'street "+key+"', '000', '0000-000', 'Portugal')",
"INSERT INTO ResidenceAddresses(addressId, floor, direction)VALUES("+(key+1+lastId)+", '5','left')",
"INSERT INTO Reviews(userId,adminId,residenceId,review,rating,createdOn,approvedOn,anonymous,approved)VALUES(0,0,"+(key+1+lastId)+",'teste de teste', 5, '1000-01-01 00:00:00', '1000-01-01 00:00:00', false, false)"
].join(';')).join(';')

const connection  = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	multipleStatements: true
})

connection.connect()

console.log("Running Sql seed ...")

// please if not a new or clean DB check what is the lastId and sent it as parameter
connection.query(seedSql, (result, err) => {
	if(err) {
		throw err
	}else {
		console.log(result)
		console.log("DB seeded, enjoy!")
	}
})

console.log("Closing Connection!")
connection.end()
