const customer = require('./customer');
const driver = require('./driver');
const booking = require('./booking');
const admin = require('./admin');
const address = require('./customer_address');
const log = require("./log");
const boom = require('boom');
 
let model_index = async () =>
{
    try {
        
    await customer.sql_cust();
    await driver.sql_driver();
    await address.sql_addr();
    await booking.sql_book();
    await admin.sql_admin();
    } catch (error) {
        boom.badRequest('error in creating table');
    }
   
}



module.exports = {
    model_index,
    log
}