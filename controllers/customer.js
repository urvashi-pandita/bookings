const services = require("../services");
const config= require('../config');
const jwt = require("jsonwebtoken");
const boom = require("boom");

async function signUp(data){
    try {
        let checkEmail = await services.customerServices.checkEmail(data.email);
        // if(checkEmail[0] == null){
            if(!checkEmail[0]){
            let otp = Math.floor(Math.random() * 9000) + 1000;
            if(!otp)
            {
                return boom.badRequest(config.OTP_ERROR);
            }
            console.log("OTP =======> " + otp);
            let registerCustomer = await services.customerServices.register(data, otp);
            if(!registerCustomer)
            {
                return boom.badRequest(config.REGISTRATION_ERROR);
            }
            let getId = await services.customerServices.checkEmail(data.email);
            if(!getId)
            {
                return boom.badRequest(config.ID_ERROR);
            }
            let token = jwt.sign(getId[0].customer_id, 'signSecretKey');
            if(!token)
            {
                return boom.badRequest(config.TOKEN_ERROR);
            }

            return {
                statusCode: 200,
                message: "Registered Succesfully",
                result: {
                    name: data.email,
                    phone: data.phone,
                    email: data.email,
                   // accessToken: token
                }
            }
        }
        else{
            return boom.badRequest(config.EMAIL_REGISTERED);
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.SIGNING_UP);
    }
}

async function login(data){
    try {
        let login = await services.customerServices.login(data.email, data.password);
        if(!login)
        {
            return boom.badRequest(config.LOGIN_ERROR);
        }
        if(login.length != 0){
            let token = jwt.sign({ id: login[0].customer_id, date: new Date().getTime() }, 'customer_secretKey');
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
        console.log(error);
        return boom.badRequest(config.IMPLEMENTING_LOGIN);
    }
}

async function verifyOtp(verifyToken, req) {
    try {
       
        let checkOtp = await services.customerServices.checkOtp(verifyToken, req.headers.otp);
        // if(checkOtp[0] != null){
            if(checkOtp[0]){
            let updateAccount = await services.customerServices.updateAccount(verifyToken.id);
            if(!updateAccount)
            {
                return boom.badRequest(config.UPDATING_ACCOUNT);
            }
            return {
                statusCode: 200,
                message: "Account Verified"
            }
        }
        else{
            return boom.badRequest(config.WRONG_OTP);
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.VERIFYING_ACCOUNT);
    }
}

async function addAddress(verifyToken, data) {
    try {
        console.log(verifyToken);
        
        let address = await services.customerServices.addAddress(verifyToken.id, data.payload);
        //console.log("address------>",address);
        
        if(!address)
        {
            return boom.badRequest(config.ADDING_ADDRESS_ERROR);
        }
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
        console.log(error);
        return boom.badRequest(config.IMPLEMENTING_ADD_ADDRESS);
    }
}


async function getAllAddresses(verifyToken, req){
    try {
        
        let getAllAddress = await services.customerServices.getAllAddresses(verifyToken.id);
        if(!getAllAddress)
        {
            return boom.badRequest(config.GETTING_ADDRESSES);
        }
        return {
            statusCode: 200,
            message: "List of all the Addresses",
            data: getAllAddress
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.IMPLEMENTING_GET_ADDRESS);
    }
}


module.exports = {
    signUp,
    login,
    verifyOtp,
    addAddress,
    getAllAddresses
}