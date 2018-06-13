const joi = require("joi");
const controllers = require("../controllers");

let customer = (server) => {

    /**
     * ---------------
     * CUSTOMER SIGNUP
     * ---------------
    */
    server.route({
        method: "POST",
        path: "/customer/signUp",
        handler: function(req, res){
            return controllers.customerController.signUp(req.payload);
        },
        config: {
            description: "Customer Sign Up API",
            tags: ["api", "customer"],
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
     * --------------
     * CUSTOMER LOGIN
     * --------------
    */
    server.route({
        method: "POST",
        path: "/customer/login",
        handler: function(req, res){
            return controllers.customerController.login(req.payload);
        },
        config: {
            description: "Customer login API",
            tags: ["api", "customer"],
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    password: joi.string().required().min(5)
                }
            }
        }
    })


    /**
     * -------------------
     * CUSTOMER VERIFY OTP
     * -------------------
    */
    server.route({
        method: "post",
        path: "/customer/verifyOtp",
        handler: function(req, res){
            return controllers.customerController.verifyOtp(req)
        },
        config: {
            description: "Verify account via otp API",
            tags: ["api", "customer"],
            validate:{
                headers: joi.object({
                    'token': joi.string().required(),
                    'otp': joi.number().required()
                }).unknown()
            }
        }
    })


    /**
     * --------------------
     * CUSTOMER ADD ADDRESS
     * --------------------
    */
    server.route({
        method: "POST",
        path: "/customer/addAddress",
        handler: function(req, res) {
            return controllers.customerController.addAddress(req)
        },
        config: {
            description: "Add multiple addresses",
            tags: ["api", "customer"],
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
     * --------------------
     * CUSTOMER GET ADDRESS
     * --------------------
    */
    server.route({
        method: "GET",
        path: "/customer/Addresses",
        handler: function (req, res){
            return controllers.customerController.getAllAddresses(req);
        },
        config: {
            description: "Get All Address",
            tags: ["api", "customer"],
            validate: {
                headers: joi.object({
                    "token": joi.string().required()
                }).unknown()
            }
        }
    })

}



module.exports = customer;
