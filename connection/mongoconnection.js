const models = require("../models");

const mongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017";

const dbName = "expressdb";

function initDb(){
    mongoClient.connect(url, (err, client) => {
        
        if(err) console.log(err);

        console.log("Connected to MongoDB");

        const databaseName = client.db(dbName);
        global.dataBase = databaseName;
        models.log();
    });
}

module.exports = initDb;