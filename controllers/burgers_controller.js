const express = require("express");
let router = express.Router();
let burger = require("../models/burger.js");

router.get("/*", function(req, res) {
    burger.selectAll(function(data) {
        let handlebars = {
            burgers: data
        };
        console.log(handlebars);
        res.render("index", handlebars);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name"], [req.body.burger_name], function(result) {
        console.log(req.body.burger_name);
        res.json({id: result.insertId});
    });
});

router.put("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;

    console.log(condition);

    burger.updateOne({devoured: 1}, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;