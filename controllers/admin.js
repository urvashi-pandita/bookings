const services = require("../services");
const jwt = require("jsonwebtoken");
const boom = require("boom");
const config = require("../config");

async function adminLogin(req) {
    try {
        let login = await services.adminServices.login(req.payload.email, req.payload.password);
        if(!login)
        {
            return boom.badRequest(config.LOGIN_ERROR);
        }
        if (!login.length ) {
            let token = jwt.sign({id:login[0].admin_id, date: new Date().getTime()}, 'adminSecretKey');
            return {
                statusCode: 200,
                message: "Successfully Logged In",
                data: {
                    name: login[0].admin_name,
                    email: login[0].admin_email,
                    phone: login[0].admin_phone,
                    accessToken: token
                }
            }
        }
        else {
            return boom.badRequest(config.WRONG_EMAIL_PASSWORD);
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.IMPLEMENTING_LOGIN);
    }
}

async function getAllCustomers(verifyToken, req) {
    try {
        if (req.headers.search) {
            let getSearchCustomer = await services.adminServices.getSearchCustomer(req.headers.search);
            if(!getSearchCustomer)
            {
                return boom.badRequest(config.ERROR_IN_SEARCHING_CUSTOMER);
            }
            if(getSearchCustomer.length != 0){
                return {
                    statusCode: 200,
                    message: "List of all the customers",
                    data: getSearchCustomer   
                }
            }
            else{
                return boom.badRequest(config.NO_CUSTOMER_FOUND);
            }
        }
        else {
            let getCustomer = await services.adminServices.getAllCustomers();
            if(!getCustomer)
            {
                boom.badRequest(config.ERROR_IN_GETTING_CUSTOMER);
            }
            if (getCustomer.length != 0) {
                return {
                    statusCode: 200,
                    message: "List of Customers you searched",
                    data: getCustomer
                }
            }
            else {
                return boom.badRequest(config.NO_CUSTOMER_PRESENT);
            }
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.ERROR_GETTING_ADDRESS);
    }
}

async function getAllBookings(verifyToken, req) {
    try {
        if (req.headers.search) {
            let getSearchBooking = await services.adminServices.getSearchBooking(req.headers.search);
            if(!getSearchBooking)
            {
                return boom.badRequest(config.ERROR_IN_SEARCHING_BOOKINGS);
            }
            if (getSearchBooking.length != 0) {
                return {
                    statusCode: 200,
                    message: "List of Bookings you searched",
                    data: getSearchBooking
                }
            }
            else {
                return boom.badRequest(config.NO_BOOKING_FOUND);
            }
        }
        else {
            let getAllBooks = await services.adminServices.getAllBookings();
            if (getAllBooks.length != 0) {
                return {
                    statusCode: 200,
                    message: "List Of all Bookings",
                    data: getAllBooks
                }
            }
            else {
                return boom.badRequest(config.NO_BOOKING_FOUND);
            }
        }

    } catch (error) {
        console.log(error);
        return boom.badRequest(config.GETTING_ALL_BOOKINGS);
    }
}

async function getAllDrivers(verifyToken, req) {
    try {
        
        if(req.headers.search){
            let getSearchDriver = await services.adminServices.getSearchDriver(req.headers.search);
            if(!getSearchDriver)
            {
                return boom.badRequest(config.ERROR_IN_SEARCHING_DRIVERS);
            }
            return {
                statusCode: 200,
                message: "List of drivers you searched",
                data: getSearchDriver
            }
        }
        else{
            let getDriver = await services.adminServices.getAllDrivers();
            if(!getDriver)
            {
                return boom.badRequest(config.ERROR_IN_GETTING_DRIVER);
            }
            if (getDriver.length != 0) {
                return {
                    statusCode: 200,
                    message: "List Of all Drivers",
                    data: getDriver
                }
            }
            else {
                return boom.badRequest(config.NO_DRIVER_FOUND);
            }
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.GETTING_ALL_DRIVERS);
    }
}

async function assignDriver(verifyToken, req) {
    try {
        let assignDriver = await services.adminServices.assignDriver(req.payload);
        if(!assignDriver)
        {
            return boom.badRequest(config.ERROR_IN_ASSIGNING_DRIVER);
        }
        return {
            statusCode: 200,
            message: "Driver Assigned",
            data: assignDriver
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.IMPLEMENTING_ASSIGNING_DRIVERS);
    }
}

async function log(verifyToken, req){
    try {
        if(req.headers.search){
            let getLog = await services.adminServices.logSearch(verifyToken.id, req.headers.search);
            if(!log)
            {
                return boom.badRequest(config.ERROR_GETTING_LOG);
            }
            if(getLog.length != 0){
                let logArr = [];
                getLog.forEach(element => {
                    let allLog = {
                        booking_id: element.booking_id,
                        descrption: element.desc,
                        date: element.date
                    }
                    logArr.push(allLog);
                });
                return {
                    statusCode: 200,
                    message: "List of log",
                    data: logArr
                }
            }
            else{
                return boom.badRequest(config.NO_LOG_FOUND);
            }
        }
        else{
            let getLog = await services.adminServices.log(verifyToken.id);
            if(!getLog)
            {
                return boom.badRequest(config.ERROR_GETTING_LOG);
            }
            let logArr = [];
            getLog.forEach(element => {
                let allLog = {
                    booking_id: element.booking_id,
                    descrption: element.desc,
                    date: element.date
                }
                logArr.push(allLog);
            });
            return {
                statusCode: 200,
                message: "List of log",
                data: logArr
            }
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.ERROR_IN_LOGS);
    }
}


async function getAvailDriver(verifyToken, req){
    try {
       
        let getAvailDriver = await services.adminServices.getAvailDriver(verifyToken.id);
        if(!getAvailDriver)
        {
            return boom.badRequest(config.ERROR_IN_GET_AVAILABLE_DRIVERS);
        }
        return {
            statusCode: 200,
            message: "List of available drivers",
            data: getAvailDriver
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.ERROR_IN_GETTING_AVAILABLE_DRIVERS);
    }
}

module.exports = {
    adminLogin,
    getAllCustomers,
    getAllBookings,
    getAllDrivers,
    assignDriver,
    log,
    getAvailDriver
}