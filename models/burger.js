let orm = require("../config/orm.js");

let burger = {
    selectAll: function(callback) {
        orm.selectAll("burgers", function(res) {
            callback(res);
        });
    },

    insertOne: function(cols, vals, callback) {
        orm.insertOne("burgers", cols, vals, function(res) {
            callback(res);
        });
    },

    updateOne: function(cols, condition, callback) {
        orm.updateOne("burgers", cols, condition, function(res) {
            callback(res);
        });
    }
};

module.exports = burger;