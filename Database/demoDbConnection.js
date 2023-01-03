// small demo of a connection to the DB with:
// a Select statement in the Users table
// inser statement in Users table using city

var mysql = require('mysql2');

// testing purposes
exports.addUser = async function (city) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO Users (email, username, password, name) VALUES  ( "teste", "teste", "teste","${city}" )`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}


class DB {

  // create hidden .env variables to do connection
  constructor() {

    this.con = mysql.createConnection({
      host: "localhost",
      user: "root", // switch to your current user
      password: "admin", // switch to your current password
      database: "Rentify_DB"
    });

    // test connection
    this.connect()
  }

  connect() {
    this.con.connect(function (err) {
      if (err) throw err;
      console.log("Connected to DB!");
    });
  }

  // to investigate if having a generic crud operation like this makes sense


  /* TODO:
  - generic CRUD methods
  */

}

var db = new DB();

class Users {
  constructor() {
    this.id;
    this.email = "u";
    this.username = "u";
    this.password = "u";
    this.name = "u";
  }
}

var user = new Users();

create(user);

// check if a super generic insert command makes sense
function create(object) {
  var columnNames = "";
  var values = "";

  for (let [key, value] of Object.entries(object)) {
    if (key === "id") continue
    columnNames += key + ",";
    values += `"${value}",`;
  }
  columnNames = columnNames.slice(0, -1);
  values = values.slice(0, -1);

  // restriction: class has same name as table
  var sql = `INSERT INTO ${object.constructor.name} (${columnNames}) VALUES (${values})`;
  db.con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

