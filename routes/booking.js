const joi = require("joi");
const controller = require("../controllers");


let booking = (server) => {

    /**
     * --------------
     * BOOKING INSERT
     * --------------
    */
    server.route({
        method: "POST",
        path: "/booking/insert",
        handler: function (req, res){
            return controller.bookingController.insertBooking(req);
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
        path: "/booking/getBooking",
        handler: function (req, res){
            return controller.bookingController.getBooking(req);
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
     * -------------------
     * GET NEAREST DRIVER
     * -------------------
    */

   server.route({
    method: "GET",
    path: "/booking/getNearestDrivers",
    handler: function (req, res){
        return controller.bookingController.getNearestDriver(req);
    },
    config: {
        description: "Get available driver",
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
     * ------------------------------
     * GET NUMBER OF DRIVER BOOKINGS
     * -----------------------------
    */

   server.route({
    method: "GET",
    path: "/booking/getDriverTotalBookings",
    handler: function (req, res){
        return controller.bookingController.getDriverTotalBookings(req);
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
     * --------------
     * Update BOOKING
     * --------------
    */
   server.route({
        method: "POST",
        path: "/booking/update",
        handler: function (req, res){
           return controller.bookingController.updateBooking(req);
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
            return controller.bookingController.cancelBooking(req);
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
