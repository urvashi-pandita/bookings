const services = require("../services");
const config = require('../config');
const jwt = require("jsonwebtoken");
const boom =require("boom");
async function signUp(data){
    try {
        let checkEmail = await services.driverServices.checkEmail(data.email);
        if(!checkEmail)
        {
            return boom.badRequest(config.CHECKING_EMAIL);
        }
        
        // if(checkEmail[0] == null){
            if(!checkEmail[0]){
            let register = await services.driverServices.register(data);
            if(!register)
            {
                return boom.badRequest(config.REGISTERING_DATA);
            }
            return {
                statusCode: 200,
                message: "Successfully Registered",
                data: {
                    name: data.name,
                    phone: data.phone,
                    email: data.email
                }
            }
        }
        
        else{
            return boom.badRequest(config.EMAIL_REGISTERED);
        }

    } catch (error) {
        return boom.badRequest(config.ACCOUNT_REGISTER);
    }
}

async function login(verifyToken, data){
    try {
        let login = await services.driverServices.login(data.email, data.password);
        if(!login)
        {
            return boom.badRequest(config.LOGIN_ERROR);
        }
        if(login.length != 0){
            let token = jwt.sign(login[0].driver_id, 'driver_secretKey');
            if(!token)
            {
                return boom.badRequest(config.TOKEN_ERROR);
            }
            return {
                statusCode: 200,
                message: "Successfully Logged In",
                data: {
                    name: login[0].driver_name,
                    email: login[0].driver_email,
                    accessToken: token
                }
            }
        }
        else{
            return boom.badRequest(config.WRONG_EMAIL_PASSWORD);
        }
    } catch (error) {
        return boom.badRequest(config.IMPLEMENTING_LOGIN);
    }
}

async function getNearestDrivers(verifyToken, req){
    try {
        
        let getNearestDriver  =  await services.driverServices.getNearestDrivers(verifyToken, req.payload);
        if(!getNearestDriver)
        {
            return boom.badRequest(config.GETTING_NEAREST_DRIVER);
        }
        return getNearestDriver;
    }
    catch(error){
        return boom.badRequest(config.IMPLEMENTING_GETTING_NEAREST_DRIVERS);
    }
             
}

async function getNearestDriversUsingST(verifyToken, req){
    try {
        
        let getNearestDriver  =  await services.driverServices.getNearestDriversUsingST(verifyToken, req.payload);
        if(!getNearestDriver)
        {
            return boom.badRequest(config.GETTING_NEAREST_DRIVER);
        }
        return getNearestDriver;
    }
    catch(error){
        return boom.badRequest(config.IMPLEMENTING_GETTING_NEAREST_DRIVERS);
    }
             
}


async function getDriverTotalBookings(verifyToken, req){
    try {
        let getDriverTotalBookings  =  await services.driverServices.getDriverTotalBookings (verifyToken);
        if(!getDriverTotalBookings)
        {
            return boom.badRequest(config.DRIVERS_TOTAL_BOOKINGS)
        }
        return getDriverTotalBookings;
    }
    catch(error){
        return config.IMPLEMENTING_DRIVER_TOTAL_BOOKINGS;
    }
             
}
async function addLocation(verifyToken, data) {
    try {
        
        let address = await services.driverServices.addLocation(verifyToken, data.payload);
        if(!address)
        {
            return boom.badRequest(config.ADDING_ADDRESS_ERROR);
        }
        
        return {
            statusCode: 200,
            message: "Location Added",
            data: {
                details: data.payload.detail,
                latitude: data.payload.latitude,
                longitude: data.payload.longitude
            }
        }
    } catch (error) {
        return boom.badRequest(config.ADD_LOCATION);
    }
}


async function getBooking(verifyToken, req){
    try {
        let getBooking = await services.driverServices.getBooking(verifyToken);
        if(!getBooking)
        {
            return boom.badRequest(config.GETTING_BOOKING);
        }
        let bookings = [];
        getBooking.forEach(element => {
            let getBooks = {
                booking_id: element.booking_id,
                booking_title: element.booking_title,
                source_latitude: element.latitude,
                source_longitude: element.longitude,
                destination_latitude: element.destination_latitude,
                destination_longitude: element.destination_longitude,
                price: element.price,
                status: element.status,
                customer_details: {
                    name: element.customer_name,
                    email: element.customer_email,
                    phone: element.customer_phone
                }
            }
            bookings.push(getBooks);
        });
        return {
            statusCode: 200,
            message: "List of all the bookings you are assigned to",
            date: bookings
        }
    } catch (error) {
        return boom.badRequest(config.IMPLEMENTING_GET_BOOKING);
    }
}

async function taskDone(verifyToken, req){
    
    let taskDone = services.driverServices.taskDone(verifyToken, req.payload.booking_id);
    if(!taskDone)
    {
        return boom.badRequest(config.TASK_DONE_ERROR);
    }
    return {
        statusCode: 200,
        message: "Now you are available for another booking"
    }
}

module.exports = {
    signUp,
    login,
    addLocation,
    getDriverTotalBookings,
    getBooking,
    taskDone
}