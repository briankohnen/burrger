const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "tviw6wn55xwxejwj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "	b7zpug571jc36pk1",
  password: "	oa6ppm563466f0l4",
  database: "oal33gyrlbx5t1ov"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;