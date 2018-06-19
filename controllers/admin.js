const services = require("../services");
const jwt = require("jsonwebtoken");

async function adminLogin(req) {
    try {
        let login = await services.adminServices.login(req.payload.email, req.payload.password);
        if (!login.length ) {
            let token = jwt.sign(login[0].admin_id, 'adminSecretKey');
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
            return "Wrong Email or Password";
        }
    } catch (error) {
        return error;
    }
}

async function getAllCustomers(req) {
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
        if (req.headers.search) {
            let getSearchCustomer = await services.adminServices.getSearchCustomer(req.headers.search);
            if(getSearchCustomer.length != 0){
                return {
                    statusCode: 200,
                    message: "List of all the customers",
                    data: getSearchCustomer   
                }
            }
            else{
                return "No Customer Found";
            }
        }
        else {
            let getCustomer = await services.adminServices.getAllCustomers();
            if (getCustomer.length != 0) {
                return {
                    statusCode: 200,
                    message: "List of Customers you searched",
                    data: getCustomer
                }
            }
            else {
                return "NO CUSTOMERS ARE PRESENT"
            }
        }
    } catch (error) {
        return error;
    }
}

async function getAllBookings(req) {
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
        if (req.headers.search) {
            let getSearchBooking = await services.adminServices.getSearchBooking(req.headers.search);
            if (getSearchBooking.length != 0) {
                return {
                    statusCode: 200,
                    message: "List of Bookings you searched",
                    data: getSearchBooking
                }
            }
            else {
                return "No booking found";
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
                return "NO BOOKINGS"
            }
        }

    } catch (error) {
        return error
    }
}

async function getAllDrivers(req) {
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
        if(req.headers.search){
            let getSearchDriver = await services.adminServices.getSearchDriver(req.headers.search);
            return {
                statusCode: 200,
                message: "List of drivers you searched",
                data: getSearchDriver
            }
        }
        else{
            let getDriver = await services.adminServices.getAllDrivers();
            if (getDriver.length != 0) {
                return {
                    statusCode: 200,
                    message: "List Of all Drivers",
                    data: getDriver
                }
            }
            else {
                return "NO DRIVERS";
            }
        }
    } catch (error) {
        return error;
    }
}

async function assignDriver(req) {
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
        let assignDriver = await services.adminServices.assignDriver(req.payload);
        return {
            statusCode: 200,
            message: "Driver Assigned",
            data: assignDriver
        }
    } catch (error) {
        return error
    }
}

async function log(req){
    try {
        let verifyToken = await jwt.verify(req.headers.token, 'adminSecretKey');
        if(req.headers.search){
            let getLog = await services.adminServices.logSearch(verifyToken, req.headers.search);
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
                return "No Log Found"
            }
        }
        else{
            let getLog = await services.adminServices.log(verifyToken);
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
        return error
    }
}


async function getAvailDriver(req){
    try {
        let verifyToken = await jwt.verify(req.headers.token, "adminSecretKey");
        let getAvailDriver = await services.adminServices.getAvailDriver(verifyToken);
        return {
            statusCode: 200,
            message: "List of available drivers",
            data: getAvailDriver
        }
    } catch (err) {
        return err;
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