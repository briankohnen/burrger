const connection = require("./connection.js");

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {

      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }
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