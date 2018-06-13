const DAO = require('../DAO.js');

let login = async (email, password) => {
    return await DAO.find(['admin'], ['*'], `admin_email='${email}' and admin_password='${password}'`)
}

let getAllCustomers = async () => {
    return await DAO.find(['customer'], ['customer_name, customer_phone, customer_email, customer.is_verified, date as registration_date'], );

}

let getSearchCustomer = async (search) => {
    return await DAO.find(['customer'], ['*'], `customer_id like '%${search}%' or customer_name like '%${search}%' or customer_phone like '%${search}%' or customer_email like '%${search}%' or date like '%${search}%'`);
}

let getAllBookings = async () => {
    let response = [];
    result = await DAO.find(['booking b, customer_address ca, customer c'], ['DISTINCT *'], `b.customer_address_id=ca.customer_address_id AND ca.customer_id=c.customer_id order by booking_id DESC`)
    if (!result) {
        return 0;
    }
    for (let i = 0; i < result.length; i++) {
        let details = {
            booking_id: result[i].booking_id,
            booking_title: result[i].booking_title,
            seat: result[i].seat,
            detailed_address: result[i].detailed_address,
            source_address_latitude: result[i].latitude,
            source_address_longitude: result[i].longitude,
            destination_latitude: result[i].destination_latitude,
            destination_longitude: result[i].destination_longitude,
            driver_id: result[i].driver_id,
            date: result[i].date,
            customer_details: {
                customer_name: result[i].customer_name,
                customer_phone: result[i].customer_phone,
                customer_email: result[i].customer_email
            }

        }
        response.push(details)
    }
    console.log(result);
    return result;
}


let getSearchBooking = async (search) => {
    let response = [];
    result = await DAO.find(['booking b, customer_address ca, customer c'], ['*'], `b.booking_title like '%${search}%' or b.booking_id like '%${search}%' or b.seat like '%${search}%' or b.customer_address_id like '%${search}%' or b.destination_latitude like '%${search}%' or b.destination_longitude like '%${search}%' or b.date like '%${search}%' or b.driver_id like '%${search}%') AND (ca.customer_address_id=b.customer_address_id AND c.customer_id=ca.customer_id) ORDER BY b.booking_id DESC`);
    if (!result) {
        return 0;
    }
    for (let i = 0; i < result.length; i++) {
        let details = {
            booking_id: result[i].booking_id,
            booking_title: result[i].booking_title,
            seat: result[i].seat,
            detailed_address: result[i].detailed_address,
            source_address_latitude: result[i].latitude,
            source_address_longitude: result[i].longitude,
            destination_latitude: result[i].destination_latitude,
            destination_longitude: result[i].destination_longitude,
            date: result[i].date,
            customer_details: {
                customer_name: result[i].customer_name,
                customer_phone: result[i].customer_phone,
                customer_email: result[i].customer_email
            },
        }

    }
    response.push(details)

    console.log(result);
    return result;
}


let getAllDrivers = async () => {
    return await DAO.find(['driver'], ['*'], );
}

let getSearchDriver = async (search) => {
    return await DAO.find(['driver'], ['*'], `driver_id like '%${search}%' or driver_name like '%${search}%' or driver_phone like '%${search}%' or driver_email like '%${search}%' or date like '%${search}%'`);
}

let assignDriver = async (data) => {
    res1 = await DAO.find(['booking'], ['driver_id'], `booking_id='${data.booking_id}'`);
     
    if (!res1) {
        return "lhnmjhsdfnhlmdh";
    }
    else {
        res2 = await DAO.update(['booking'], [` driver_id= ${data.driver_id}`], `booking_id=${data.booking_id}`)
        if (!res2) {
            return 0;
        }
        res3 = await DAO.find(['booking'], ['*'], `booking_id= ${data.booking_id}`);
         
        if (!res3) {
            return 0;
        }
        res4 = await DAO.update(['driver'], ['status = 1'], ` driver_id= ${data.driver_id}`)
        if (!res4) {
            return 0;
        }
        let book_id = `${data.booking_id}`;
        let desc = "Driver assigned";
        let date = `${new Date()}`;
        let log =
        {
            booking_id: book_id,
            desc: desc,
            date: date
        }
        const collection = dataBase.collection("log");
        let response = await collection.insertOne(log);
    }
    return res3;
}

let log = async (id) => {
    const collection = dataBase.collection("log");
    let response = await collection.find({}).sort({ _id: -1 }).toArray();
    return response;
}

let logSearch = async (id, search) => {
    const collection = dataBase.collection("log");

    let desc = { desc: { $regex: search } };
    let booking_id = { booking_id: { $regex: search } };
    let date = { date: { $regex: search } };

    let response = await collection.find({ $or: [desc, booking_id, date] }).toArray();
    return response
}

let getAvailDriver = async (id) => {
    return await DAO.find(['driver'], ['driver_id', 'driver_name', 'driver_phone', 'driver_email'], `status=0`)
}

module.exports = {
    login,
    getAllCustomers,
    getSearchCustomer,
    getAllBookings,
    getSearchBooking,
    getAllDrivers,
    getSearchDriver,
    assignDriver,
    log,
    logSearch,
    getAvailDriver
}