const hapi = require('hapi');
const connection = require('./connection');
const routes = require('./routes');
const inert = require("inert");
const vision = require("vision");
const hapi_swagger = require("hapi-swagger");

let PORT = process.env.PORT || 3000;

const init = async () => {
    const server = new hapi.server(
        {
            port: PORT,
            host: "localhost"
        }
    );
    const swaggerOption = {
        info: {
            title: "Booking System"
        }
    }

    await server.register([
        inert,
        vision,
        {
            plugin: hapi_swagger,
            options: swaggerOption
        }
    ])

    try {
        connection();
        routes(server);
        await server.start();
    }
    catch (err) {
        console.log(err),
            process.exit(1);
    }
    console.log(`server running at ${server.info.uri}/documentation`);
}

init();
