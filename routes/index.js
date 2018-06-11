const customer = require("./customer");
const driver = require("./driver");
const booking = require("./booking");
const admin = require("./admin");

let routes = (server) => {
    customer(server);
    driver(server);
    booking(server);
    admin(server);
}

module.exports = routes;