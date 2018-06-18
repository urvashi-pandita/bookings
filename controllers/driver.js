const services = require("../services");
const config = require('../config');
const jwt = require("jsonwebtoken");
const boom =require("boom");
async function signUp(data){
    try {
        let checkEmail = await services.driverServices.checkEmail(data.email);
        
        if(checkEmail[0] == null){
            let register = await services.driverServices.register(data);
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
            return config.EMAIL_REGISTERED;
        }

    } catch (error) {
        return config.ACCOUNT_REGISTER;
    }
}

async function login(data){
    try {
        let login = await services.driverServices.login(data.email, data.password);
        console.log("login",login)
        if(login.length != 0){
            let token = jwt.sign(login[0].driver_id, 'driver_secretKey');
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
            return config.WRONG_EMAIL_PASSWORD;
        }
    } catch (error) {
        return config.INVALID_TOKEN;
    }
}

async function getNearestDrivers(req){
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'driver_secretKey');
        let getNearestDriver  =  await services.driverServices.getNearestDrivers(verifyToken, req.payload);
        return getNearestDriver;
    }
    catch(error){
        return config.INVALID_TOKEN;
    }
             
}


async function getDriverTotalBookings(req){
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'driver_secretKey');
        let getDriverTotalBookings  =  await services.driverServices.getDriverTotalBookings (verifyToken);
        return getDriverTotalBookings;
    }
    catch(error){
        return config.INVALID_TOKEN;
    }
             
}
async function addLocation(data) {
    try {
        let verifyToken = await jwt.verify(data.headers.token, 'driver_secretKey');
        let address = await services.driverServices.addLocation(verifyToken, data.payload);
        
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
        return config.ADD_LOCATION;
    }
}


async function getBooking(req){
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'driver_secretKey');
        
        let getBooking = await services.driverServices.getBooking(verifyToken);
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
        return config.INVALID_TOKEN;
    }
}

async function taskDone(req){
    let verifyToken = await jwt.verify(req.headers.token, "driver_secretKey");
    let taskDone = services.driverServices.taskDone(verifyToken, req.payload.booking_id);
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
    getNearestDrivers,
    getBooking,
    taskDone
}