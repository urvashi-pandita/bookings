const services = require("../services");
const config = require('../config');
const jwt = require("jsonwebtoken");
const boom = require("boom");

async function insertBooking(verifyToken, req){
    
    try {
        let insert = await services.bookingServices.insertBooking(verifyToken, req.payload);
        if(!insert)
        {
            return boom.badRequest(config.INSERTING_VALUE_ERROR);
        }
        let nearestDriverId = await services.bookingServices.getNearestDrivers(verifyToken, req.payload);
        if(!nearestDriverId)
        {
            return 0;
        }
        let driverDetail = await services.bookingServices.assignDriver(req.payload.source_id,nearestDriverId[0].driver_id);
        if(!driverDetail)
        {
            return 0;
        }
        return {
        statusCode: 200,
        message: "Booking Inserted",
        data: {
            title: req.payload.title,
            source_latitude: insert[0].latitude,
            source_longitude: insert[0].longitude,
            destination_latitude: req.payload.destination_latitude,
            destination_longitude: req.payload.destination_longitude,
            driver_id: driverDetail
        }
    }    
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.INSERTION_ERROR);
    }
}

async function getBooking(verifyToken, req){
    try {
        if(req.headers.search){
            let getSearchBookings = await services.bookingServices.getSearchBookings(verifyToken, req.headers.search);
            if(getSearchBookings.length != 0){
                let bookings = [];
                getSearchBookings.forEach(element => {
                    let getBookings = {
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
                    if(!getSearchBookings)
                    {
                        return boom.badRequest(config.SEARCH_BOOKINGS_ERROR);
                    }
                });
                return bookings;
            }
            else{
                return boom.badRequest(config.NO_BOOKING);
            }
        }
        else{
            let getBook = await services.bookingServices.getBooking(verifyToken);
            if(!getBook)
            {
                return boom.badRequest(config.BOOKING_ERROR);
            }
            let bookings = [];
            getBook.forEach(element => {
                let getBookings = {
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
                if(!getBookings)
                {
                    return boom.badRequest(config.BOOKING_ERROR);
                }
                bookings.push(getBookings);
            });
            return bookings;
        }
    } catch (error) {
        return boom.badRequest(config.IMPLEMENTATION_ERROR);       
    }
}

async function getNearestDrivers(verifyToken, req){
    try {
        
        let getNearestDriver  =  await services.bookingServices.getNearestDrivers(verifyToken, req.payload);
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
        
        let getNearestDriver  =  await services.bookingServices.getNearestDriversUsingST(verifyToken, req.payload);
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


async function updateBooking(verifyToken, req){
    try {
        
        let updateBook = await services.bookingServices.updateBooking(verifyToken, req.payload);
        if(!updateBook)
        {
            return boom.badRequest(config.UPDATION_ERROR);
        }
        return {
            statusCode: 200,
            message: "Booking Updated",
            data: {
                seat: req.payload.seat,
                source_latitude: updateBook.source_latitude,
                source_longitude: updateBook.source_longitude,
                destination_latitude: req.payload.destination_latitude,
                destination_longitude: req.payload.destination_longitude
            }
        }
    } catch (error) {
        return boom.badRequest(config.IMPLEMENTING_UPDATION);
    }
}

async function cancelBooking(verifyToken, req){
    try{
        let cancelBooking = await services.bookingServices.cancelBooking(verifyToken, req.payload.booking_id);
        
        if(!cancelBooking)
        {
            return boom.badRequest(config.CANCELLATION_ERROR);
        } return {
            statusCode: 200,
            message: "Booking cancelled",
         
        }
    }catch(error){
        return boom.badRequest(config.IMPLEMENTING_CANCELLATION);
    }
}


module.exports = {
    insertBooking,
    getBooking,
    getNearestDrivers,
    getNearestDriversUsingST,
    updateBooking,
    cancelBooking
}