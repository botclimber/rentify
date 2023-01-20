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
const addresses = new Array(5).fill().map((_, key) => new addr(city = 'city '+key, street = 'street' + key, nr = 'nr '+key, floor = 'floor '+key, direction = 'dir '+key, lat = key, lng = key+1, postalCode = 'posCode '+key, country = 'country '+key))

addresses.map(row => {
  console.info(row)
  db.insert(row)
})

// check if a super generic insert command makes sense
/*function create(object) {
  var columnNames = "";
  var values = "";

  for (let [key, value] of Object.entries(object)) {
    if (key === "id") continue
    columnNames += key + ",";
    values += value + ",";
  }
  columnNames = columnNames.slice(0, -1);
  values = values.slice(0, -1);

  // restriction: class has same name as table
  // another solution: have a property type which will refer to the table name
  var sql = `INSERT INTO ${object.constructor.name} (${columnNames}) VALUES (${values})`;
  db.con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}*/
