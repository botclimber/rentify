// small demo of a connection to the DB with a Select statement in the Users table

var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root", // switch to your current user
  password: "admin", // switch to your current password
  database: "Rentify_db"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM Users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });