const DAO = require('../DAO.js');
let checkEmail = async(email) => {
    return await DAO.find(['driver'],['*'],`driver_email='${email}'`);
}

let register = async(data) => {
    fields=['driver_name', 'driver_phone', 'driver_email', 'driver_password'];
    values=[data.name, data.phone, data.email, data.password];
    res1= await DAO.insert('driver', fields, values);
    return res1;
}

let login = async(email, password) => {
    return await DAO.find(['driver'],['*'],`driver_email='${email}' and driver_password='${password}'`)
}

let getNearestDrivers = async (id) =>
{
    res1 = await DAO.find(['customer_address','driver_address', `driver` ],['min(sqrt((customer_address.latitude-driver_address.latitude)*(customer_address.latitude-driver_address.latitude) + (customer_address.longitude - driver_address.longitude)*(customer_address.longitude-driver_address.longitude))) as distance, driver.driver_id, driver_name, driver_phone, driver_email' ],`1`,`driver_id order by distance ASC limit 10`); 
    return  res1;  
}

let getDriverTotalBookings = async (id) => {
    return await DAO.find(['booking', 'driver'],['booking.driver_id','count(*) as total_bookings','driver_name','driver_phone','driver_email'],`booking.driver_id=driver.driver_id `,` driver_id`);
}
let addLocation = async(id, data) => { 
    fields = ['driver_id','detailed_address', 'latitude', 'longitude'],
    values = [id, data.detail, data.latitude, data.longitude]
    res = await DAO.insert(['driver_address'],fields,values); 
    console.log(res);
    return res;
}

let getBooking = async (id) => {
    console.log(id);
    return await DAO.find(['booking b', 'customer_address ca', 'customer c'],['*'],`b.driver_id='${id}' AND b.customer_address_id=ca.customer_address_id AND ca.customer_id=c.customer_id`);
}

let taskDone = async(driver_id, booking_id) => {
    res1=await DAO.update(['driver'],['status=0',`driver_id=${driver_id}`]);
        if(!res1)
        {
            return 0;
        }
        res2= await DAO.update(['booking'],[' driver_id=NULL'],`booking_id=${booking_id}`);
                    let book_id = booking_id;
                    let desc = "Task completed and Driver is now available";
                    let date = `${new Date()}`;
                    let log = {
                        booking_id: book_id,
                        desc: desc,
                        date: date
                    }
                    const collection = dataBase.collection("log");
                    let response = await collection.insertOne(log);
    return res2;
}

module.exports = {
    checkEmail,
    register,
    login,
    getDriverTotalBookings,
    getNearestDrivers,
    addLocation,
    getBooking,
    taskDone
}