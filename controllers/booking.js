const services = require("../services");
const config = require('../config');
const jwt = require("jsonwebtoken");
const boom = require("boom");

async function insertBooking(verifyToken, req){
    
    try {
        let insert = await services.bookingServices.insertBooking(verifyToken, req.payload);
        console.log(insert);
        if(!insert)
        {
            return boom.badRequest(config.INSERTING_VALUE_ERROR);
        }
        let nearestDriverId = await services.driverServices.getNearestDrivers(verifyToken, req.payload);
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
                });
                return bookings;
            }
            else{
                return boom.badRequest(config.NO_BOOKING);
            }
        }
        else{
            let getBook = await services.bookingServices.getBooking(verifyToken);
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
                bookings.push(getBookings);
            });
            return bookings;
        }
    } catch (error) {
        console.log(error);
        return boom.badRequest(config.IMPLEMENTATION_ERROR);       
    }
}


async function updateBooking(req){
    try {
        
        let updateBook = await services.bookingServices.updateBooking(verifyToken, req.payload);
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
        return boom.badRequest(config.UPDATION_ERROR)
    }
}

async function cancelBooking(req){
    try{
        let cancelBooking = await services.bookingServices.cancelBooking(verifyToken, req.payload.booking_id);
        return {
            statusCode: 200,
            message: "Booking cancled",
         
        }
    }catch(error){
        return boom.unauthorized('invalid token');
    }
}


module.exports = {
    insertBooking,
    getBooking,
    updateBooking,
    cancelBooking
}