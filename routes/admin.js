const controller = require("../controllers");
const joi = require("joi");

let admin = (server) => {

    /**
     * -----------
     * ADMIN LOGIN
     * -----------
    */
    server.route({
        method: "POST",
        path: "/admin/login",
        handler: function (req, res){
            return controller.adminController.adminLogin(req);
        },
        config: {
            description: "Admin Login API",
            tags: ["api", "admin"],
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    password: joi.string().required().min(5)
                }
            }
        }
    })


    /**
     * -----------------------
     * ADMIN GET ALL CUSTOMERS
     * -----------------------
    */
    server.route({
        method: "GET",
        path: "/admin/getAllCustomer",
        handler: function (req, res){
            return controller.adminController.getAllCustomers(req)
        },
        config: {
            description: "Get All The customers",
            tags: ["api", "admin"],
            validate: {
                headers: joi.object({
                    'token': joi.string().required(),
                    'search': joi.string().optional()
                }).unknown()
            }
        }
    })


    /**
     * ----------------------
     * ADMIN GET ALL BOOKINGS
     * ----------------------
    */
    server.route({
        method: "GET",
        path: "/admin/getAllBookings",
        handler: function (req, res){
            return controller.adminController.getAllBookings(req);
        },
        config: {
            description: "Get All The Bookings API",
            tags: ["api", "admin"],
            validate: {
                headers: joi.object({
                    'token': joi.string().required(),
                    'search': joi.string().optional()
                }).unknown()
            }
        }
    })


    /**
     * -----------------
     * ADMIN ALL DRIVERS
     * -----------------
    */
    server.route({
        method: "GET",
        path: "/admin/getAllDrivers",
        handler: function (req, res){
            return controller.adminController.getAllDrivers(req);
        },
        config: {
            description: "Get All The Driver API",
            tags: ["api", "admin"],
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
     * ADMIN ASSIGN DRIVER
     * -------------------
    */
    server.route({
        method: "POST",
        path: "/admin/assignDriver",
        handler: function (req, res){
            return controller.adminController.assignDriver(req);
        },
        config: {
            description: "Assign driver API",
            tags: ["api", "admin"],
            validate: {
                payload: {
                    driver_id: joi.number().required(),
                    booking_id: joi.number().required()
                },
                headers: joi.object({
                    'token': joi.string().required()
                }).unknown()
            }
        }
    })


    /**
     * -----------
     * ADMIN GET LOGS
     * -----------
    */
    server.route({
        method: "GET",
        path: "/admin/log",
        handler: function (req, res){
            return controller.adminController.log(req);
        },
        config: {
            description: "Get All Logs API",
            tags: ["api", "admin"],
            validate: {
                headers: joi.object({
                    'token': joi.string().required(),
                    'search': joi.string().optional()
                }).unknown()
            }
        }
    })

    /**
     * ----------------
     * GET AVAIL DRIVER
     * ----------------
     */
    server.route({
        method: "GET",
        path: "/admin/getAvailDriver",
        handler: function(req, res) {
            return controller.adminController.getAvailDriver(req);
        },
        config: {
            description: "List of all the available drivers",
            tags: ["api", "admin"],
            validate: {
                headers: joi.object({
                    "token": joi.string().required()
                }).unknown()
            }
        }
    })
    
}


module.exports = admin;