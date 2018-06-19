const services = require("../services");
const config= require('../config');
const jwt = require("jsonwebtoken");
const boom = require("boom");

async function signUp(data){
    try {
        let checkEmail = await services.customerServices.checkEmail(data.email);
        if(checkEmail[0] == null){
            let otp = Math.floor(Math.random() * 9000) + 1000;
            console.log("OTP =======> " + otp);
            let registerCustomer = await services.customerServices.register(data, otp);
            let getId = await services.customerServices.checkEmail(data.email);
            let token = jwt.sign(getId[0].customer_id, 'signSecretKey');

            return {
                statusCode: 200,
                message: "Registered Succesfully",
                result: {
                    name: data.email,
                    phone: data.phone,
                    email: data.email,
                    accessToken: token
                }
            }
        }
        else{
            return config.EMAIL_REGISTERED;
        }
    } catch (error) {
        return config.INVALID_TOKEN;
    }
}

async function login(data){
    try {
        let login = await services.customerServices.login(data.email, data.password);
        if(login.length != 0){
            let token = jwt.sign(login[0].customer_id, 'customer_secretKey');
            return {
                statusCode: 200,
                message: "Successfully Logged In",
                data: {
                    name: login[0].customer_name,
                    phone: login[0].customer_phone,
                    email: login[0].customer_email,
                    accessToken: token
                }
            }
        }
        else{
            return config.WRONG_EMAIL_PASSWORD;
        }
    } catch (error) {
        return boom.badRequest(config.LOGIN_ERROR);
    }
}

async function verifyOtp(req) {
    try {
       
        let checkOtp = await services.customerServices.checkOtp(verifyToken, req.headers.otp);
        if(checkOtp[0] != null){
            let updateAccount = await services.customerServices.updateAccount(verifyToken);
            return {
                statusCode: 200,
                message: "Account Verified"
            }
        }
        else{
            return config.WRONG_OTP;
        }
    } catch (error) {
        return config.INVALID_TOKEN;
    }
}

async function addAddress(data) {
    try {
        
        let address = await services.customerServices.addAddress(verifyToken, data.payload);
        return {
            statusCode: 200,
            message: "Address Added",
            data: {
                details: data.payload.detail,
                latitude: data.payload.latitude,
                longitude: data.payload.longitude
            }
        }
    } catch (error) {
        return config.INVALID_TOKEN;
    }
}


async function getAllAddresses(req){
    try {
        
        let getAllAddress = await services.customerServices.getAllAddresses(verifyToken);
        return {
            statusCode: 200,
            message: "List of all the Addresses",
            data: getAllAddress
        }
    } catch (error) {
        return config.INVALID_TOKEN;
    }
}


module.exports = {
    signUp,
    login,
    verifyOtp,
    addAddress,
    getAllAddresses
}