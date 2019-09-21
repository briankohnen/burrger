const connection = require("./connection.js");

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

let orm = {

    selectAll: function(table, callback) {
        let queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },

    insertOne: function (table, cols, vals, callback) {
        let queryString = "INSERT INTO " + table;
        queryString += " (" + cols.toString() + ") ";
        queryString += "VALUES (?)";

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },

    updateOne: function (table, colVals, condition, callback) {
        let queryString = "UPDATE " + table;
        queryString += " SET " + objToSql(colVals);
        queryString += " WHERE " + condition;

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    }

};

module.exports = orm;