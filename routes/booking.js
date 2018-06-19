const joi = require("joi");
const controller = require("../controllers");
const boom = require("boom");
const config = require("../config");
const jwt = require("jsonwebtoken");
let booking = (server) => {

    /**
     * --------------
     * BOOKING INSERT
     * --------------
    */
    server.route({
        method: "POST",
        path: "/booking/insert",
        handler: async function (req, res){
            try {
                let verifyToken = await jwt.verify(req.headers.token, 'customer_secretKey');
                return controller.bookingController.insertBooking(verifyToken, req);
            } catch (error) {
               // console.log(error);
                
                return boom.unauthorized(config.INVALID_TOKEN);
            } 
        },
        config: {
            description: "Insert Booking API",
            tags: ["api", "booking"],
            validate: {
                payload: {
                    title: joi.string().optional(),
                    seat: joi.number().required().min(1),
                    source_id: joi.number().required(),
                    destination_latitude: joi.string().required(),
                    destination_longitude: joi.string().required(),
                },
                headers: joi.object({
                    'token': joi.string().required()
                }).unknown()
            }
        }
    })

    /**
     * ----------------
     * GET ALL BOOKINGS
     * ----------------
    */
    server.route({
        method: "GET",
        path: "/booking",
        handler:async function (req, res){
            try {
                let verifyToken = await jwt.verify(req.headers.token, 'customer_secretKey');
                return controller.bookingController.getBooking(verifyToken, req);
            } catch (error) {
                // console.log(error);
                
                boom.unauthorized(config.INVALID_TOKEN);
            }  
        },
        config: {
            description: "Get All Bookings",
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
     * --------------
     * Update BOOKING
     * --------------
    */
   server.route({
        method: "POST",
        path: "/booking/update",
        handler: function (req, res){
            try {
                let verifyToken = jwt.verify(req.headers.token, 'customer_secretKey');
                return controller.bookingController.updateBooking(verifyToken, req);
            } catch (error) {
                return boom.unauthorized(config.INVALID_TOKEN);
            }
           
        },
        config: {
            description: "Update Booking",
            tags: ["api", "booking"],
            validate: {
                headers: joi.object({
                    "token": joi.string().required()
                }).unknown(),
                payload: {
                    booking_id: joi.number().required(),
                    seat: joi.number().required().min(1),
                    source_id: joi.number().required(),
                    destination_latitude: joi.string().required(),
                    destination_longitude: joi.string().required(),
                }
            }
        }
   })

    /**
     * --------------
     * CANCEL BOOKING
     * --------------
    */
    server.route({
        method: "POST",
        path: "/booking/cancel",
        handler: function(req, res){
            try {
                let verifyToken = jwt.verify(req.headers.token, 'customer_secretKey');  
                return controller.bookingController.cancelBooking(verifyToken, req);
            } catch (error) {
                return boom.badRequest(config.INVALID_TOKEN);
            }
        },
        config: {
            description: "Cancel Booking",
            tags: ["api", "booking"],
            validate: {
                payload: {
                    booking_id: joi.number().required()
                },
                headers: joi.object({
                    'token': joi.string().required()
                }).unknown()
            }
        }
    })

}

module.exports = booking;
