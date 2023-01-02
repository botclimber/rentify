// small demo of a connection to the DB with:
// a Select statement in the Users table
// inser statement in Users table using city

var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root", // switch to your current user
  password: "admin", // switch to your current password
  database: "Rentify_db"
});

// testing purposes
exports.insertUser = async function (city) {
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


