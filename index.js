const PORT = process.env.PORT || 5000;
const BDD = process.env.MONGODB_URI || "mongodb://localhost:27017/test"
const express = require('express');
const app = express();
const mongodb = require("mongodb");
const Article = require('./models/article')

const ObjectID = mongodb.ObjectID;

const UTILISATEURS_COLLECTION = "utilisateurs";

export var db;

// mongoose instance connection url connection
mongodb.Promise = global.Promise;
mongodb.connect(BDD, function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    const server = app.listen(PORT, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    })

});

var routes = require('./controllers/controllerUtil'); //importing route
routes(app);