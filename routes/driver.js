const joi = require("joi");
const boom = require("boom");
const jwt = require("jsonwebtoken");
const controller = require("../controllers");
const config = require("../config");

let driver = (server) => {

    /**
     * -------------
     * DRIVER SIGNUP
     * -------------
    */
    server.route({
        method: "POST",
        path: "/driver/signUp",
        handler: function(req, res){
            return controller.driverController.signUp(req.payload);
        },
        config: {
            description: "Driver SignUp API",
            tags: ["api", "driver"],
            validate: {
                payload: {
                    name: joi.string().required(),
                    phone: joi.string().required(),
                    email: joi.string().email().required(),
                    password: joi.string().required().min(5) 
                }
            }
        }
    })


    /**
     * -----------
     * DRIVER LOGIN
     * -----------
    */
    server.route({
        method: "POST",
        path: "/driver/login",
        handler: function (req, res){
            return controller.driverController.login(req.payload);
        },
        config: {
            description: "Driver Login API",
            tags: ["api", "driver"],
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    password: joi.string().required().min(5).description("Minimum 5 characters")
                }
            }
        }
    })

  /**
     * ------------------------------
     * GET NUMBER OF DRIVER BOOKINGS
     * -----------------------------
    */

   server.route({
    method: "GET",
    path: "/driver/TotalBookings",
    handler: async function (req, res){
        try {
            let verifyToken = await jwt.verify(req.headers.token, 'driver_secretKey');
            return controller.driverController.getDriverTotalBookings(verifyToken, req);
        } catch (error) {
            console.log(error);
            return boom.unauthorized(config.INVALID_TOKEN);
        }   
    },
    config: {
        description: "Get total number of bookings of driver",
        tags: ["api", "booking"],
        validate: {
            headers: joi.object({
                'token': joi.string().required(),
                'search': joi.string().optional()
            }).unknown()
        }
    }
})
    /**
     *---------------------
     *  DRIVER ADD LOCATION
     *---------------------
     */

    server.route({
        method: "POST",
        path: "/driver/addLocation",
        handler: async function(req, res) {
            try {
                let verifyToken = await jwt.verify(req.headers.token, 'driver_secretKey');
                return controller.driverController.addLocation(verifyToken, req)
            } catch (error) {
                console.log(error);
                return boom.unauthorized(config.INVALID_TOKEN);
            }
            
        },
        config: {
            description: "Add multiple locations",
            tags: ["api", "driver"],
            validate: {
                payload: {
                    detail: joi.string().optional(),
                    latitude: joi.string().required(),
                    longitude:  joi.string().required(),
                },
                headers: joi.object({
                    'token': joi.string().required()
                }).unknown()
            }
        }
    })


    /**
     *-------------
     * GET BOOKINGS
     *-------------
     */
    server.route({
        method: "POST",
        path: "/driver/Bookings",
        handler:async function(req, res){
            try {
                let verifyToken = await jwt.verify(req.headers.token, 'driver_secretKey');
                return controller.driverController.getBooking(req);
            } catch (error) {
                console.log(error);
                boom.unauthorized(config.INVALID_TOKEN);
            }
           
        },
        config: {
            description: "Driver Get Bookings API",
            tags: ["api", "driver"],
            validate: {
                headers: joi.object({
                    "token": joi.string().required()
                }).unknown()
            }
        }
    })


    /**
     * -----------
     * FREE DRIVER
     * -----------
     */
    server.route({
        method: "POST",
        path: "/driver/taskDone",
        handler:async function(req, res) {
            try {
                 let verifyToken = await jwt.verify(req.headers.token, "driver_secretKey");
            return controller.driverController.taskDone(verifyToken, req);
            } catch (error) {
                console.log(error);
               return boom.unauthorized(config.INVALID_TOKEN);
            }   
        },
        config: {
            description: "Set Driver Free",
            tags: ["api", "driver"],
            validate: {
                headers: joi.object({
                    "token": joi.string().required()
                }).unknown(),
                payload: {
                    "booking_id": joi.string().required()
                }
            }
        }
    })

}

module.exports = driver;

