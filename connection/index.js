const model = require('../models');
const sqlconn = require('./sqlconnection');
const mongoconn = require('./mongoconnection');
const boom = require('boom');
let connection = async () => {

    try {
        await sqlconn();
        await mongoconn();
        await model.model_index();
    } catch (error) {
        console.log(error);
        return boom.badImplementation('database error');
    }
}
module.exports = connection;