const controller = require("../controllers");
const joi = require("joi");
const boom = require("boom");
const config = require("../config");

let admin = (server) => {

    // /**
    //  * -----------
    //  * ADMIN LOGIN
    //  * -----------
    // */
    // server.route({
    //     method: "POST",
    //     path: "/admin/login",
    //     handler: function (req, res){
    //         return controller.adminController.adminLogin(req);
    //     },
    //     config: {
    //         description: "Admin Login API",
    //         tags: ["api", "admin"],
    //         validate: {
    //             payload: {
    //                 email: joi.string().email().required(),
    //                 password: joi.string().required().min(5)
    //             }
    //         }
    //     }
    // })


    // /**
    //  * -----------------------
    //  * ADMIN GET ALL CUSTOMERS
    //  * -----------------------
    // */
    // server.route({
    //     method: "GET",
    //     path: "/admin/AllCustomer",
    //     handler: function (req, res){
    //         try {
    //            let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
    //             return controller.adminController.getAllCustomers(verifyToken, req) 
    //         } catch (error) {
    //             console.log(error);
    //             return boom.unauthorized(config.INVALID_TOKEN);
    //         }
        
    //     },
    //     config: {
    //         description: "Get All The customers",
    //         tags: ["api", "admin"],
    //         validate: {
    //             headers: joi.object({
    //                 'token': joi.string().required(),
    //                 'search': joi.string().optional()
    //             }).unknown()
    //         }
    //     }
    // })


    // /**
    //  * ----------------------
    //  * ADMIN GET ALL BOOKINGS
    //  * ----------------------
    // */
    // server.route({
    //     method: "GET",
    //     path: "/admin/AllBookings",
    //     handler: function (req, res){
    //         try {
    //             let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
    //             return controller.adminController.getAllBookings(verifyToken, req);
    //         } catch (error) {
    //             console.log(error);
    //             return boom.unauthorized(config.INVALID_TOKEN);
    //         }
            
    //     },
    //     config: {
    //         description: "Get All The Bookings API",
    //         tags: ["api", "admin"],
    //         validate: {
    //             headers: joi.object({
    //                 'token': joi.string().required(),
    //                 'search': joi.string().optional()
    //             }).unknown()
    //         }
    //     }
    // })


    // /**
    //  * -----------------
    //  * ADMIN ALL DRIVERS
    //  * -----------------
    // */
    // server.route({
    //     method: "GET",
    //     path: "/admin/AllDrivers",
    //     handler: function (req, res){
    //         try {
    //              let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
    //         return controller.adminController.getAllDrivers(verifyToken, req);
    //         } catch (error) {
    //             console.log(error)
    //             return boom.unauthorized(config.INVALID_TOKEN);
    //         }
           
    //     },
    //     config: {
    //         description: "Get All The Driver API",
    //         tags: ["api", "admin"],
    //         validate: {
    //             headers: joi.object({
    //                 'token': joi.string().required(),
    //                 'search': joi.string().optional()
    //             }).unknown()
    //         }
    //     }
    // })


    // /**
    //  * -------------------
    //  * ADMIN ASSIGN DRIVER
    //  * -------------------
    // */
    // server.route({
    //     method: "POST",
    //     path: "/admin/AssignDriver",
    //     handler: function (req, res){
    //         try {
    //             let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
    //             return controller.adminController.assignDriver(verifyToken, req);
    //         } catch (error) {
    //             console.log(error);
    //             return boom.unauthorized(config.INVALID_TOKEN);
    //         }
            
    //     },
    //     config: {
    //         description: "Assign driver API",
    //         tags: ["api", "admin"],
    //         validate: {
    //             payload: {
    //                 driver_id: joi.number().required(),
    //                 booking_id: joi.number().required()
    //             },
    //             headers: joi.object({
    //                 'token': joi.string().required()
    //             }).unknown()
    //         }
    //     }
    // })


    // /**
    //  * -----------
    //  * ADMIN GET LOGS
    //  * -----------
    // */
    // server.route({
    //     method: "GET",
    //     path: "/admin/log",
    //     handler: function (req, res){
    //         try {
    //            let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
    //         return controller.adminController.log(verifyToken, req); 
    //         } catch (error) {
    //             console.log(error);
    //             return boom.unauthorized(config.INVALID_TOKEN);
    //         }
            
    //     },
    //     config: {
    //         description: "Get All Logs API",
    //         tags: ["api", "admin"],
    //         validate: {
    //             headers: joi.object({
    //                 'token': joi.string().required(),
    //                 'search': joi.string().optional()
    //             }).unknown()
    //         }
    //     }
    // })

    // /**
    //  * ----------------
    //  * GET AVAIL DRIVER
    //  * ----------------
    //  */
    // server.route({
    //     method: "GET",
    //     path: "/admin/AvailDriver",
    //     handler: function(req, res) {
    //         try {
    //             let verifyToken = await jwt.verify(req.headers.token, "adminSecretKey");
    //             return controller.adminController.getAvailDriver(verifyToken, req); 
    //         } catch (error) {
    //             console.log(error);
    //             return boom.unauthorized(config.INVALID_TOKEN);
    //         }
           
    //     },
    //     config: {
    //         description: "List of all the available drivers",
    //         tags: ["api", "admin"],
    //         validate: {
    //             headers: joi.object({
    //                 "token": joi.string().required()
    //             }).unknown()
    //         }
    //     }
    // })
    
}


module.exports = admin;