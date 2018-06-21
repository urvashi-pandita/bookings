const object_id = require("mongodb").ObjectID;
const DAO = require('../DAO.js');
let insertBooking = async (id, data) => 
{
    fields=['booking_title','seat','customer_address_id','destination_latitude','destination_longitude','price','status'];
    values=[data.title, data.seat, data.source_id, data.destination_latitude, data.destination_longitude, '49', 'Booked']
     await DAO.insert('booking',fields,values);
    
    res = await DAO.find('customer_address','*',`customer_id='${id}'`);
    console.log(res);
    
    if(res != null)
    {
        r = await DAO.find(['booking','customer_address'],['booking_id'],`customer_address.customer_id='${id}' and booking.customer_address_id=customer_address.customer_address_id order by booking_id DESC limit 1`);
        // console.log(r);
        
        let book_id = `${r[0].booking_id}`;
        let desc = "Booking inserted";
        let date = `${new Date()}`;
        let log = 
        {
            booking_id: book_id,
            desc: desc,
            date: date
        }
        const collection = dataBase.collection("log");
        let response = await collection.insertOne(log);
        // console.log(response); 
        return res;
    }
}
 

let getBooking = async (id) => 
{
    return await DAO.find(['booking b','customer_address cd','customer c'],['*'],`c.customer_id='${id}' and cd.customer_id=c.customer_id and b.customer_address_id=cd.customer_address_id`);
}

let getSearchBookings = async (id, search) => 
{
    return await DAO.find(['booking b','customer_address cd, customer c'],['*'],`(c.customer_id='${id}' and cd.customer_id=c.customer_id and b.customer_address_id=cd.customer_address_id) AND 
    (b.booking_title like '%${search}%' or b.seat like '%${search}%' or b.customer_address_id like '%${search}%' or b.destination_latitude like '%${search}%' or b.destination_longitude like '%${search}%' or b.date like '%${search}%' or b.driver_id like '%${search}%' or c.customer_name like '%${search}%' or c.customer_email like '%${search}%' or c.customer_phone like '%${search}%' or cd.latitude like '%${search}%' or cd.longitude like '%${search}%')`)  
}


let getNearestDrivers = async (driver_id, address_id) =>
{
    res = await DAO.find(['customer_address'],['latitude','longitude'],`customer_address_id=${ address_id.source_id}`);
    

    res1 = await DAO.find([`driver_address INNER JOIN driver on driver_address.driver_id=driver.driver_id`],[' driver.driver_id', 'driver.driver_name', 'driver.driver_email', `min(sqrt(((${res[0].latitude}-driver_address.latitude)*(${res[0].latitude}-driver_address.latitude)) + ((${res[0].longitude} - driver_address.longitude)*(${res[0].longitude}-driver_address.longitude)))) as dist`]); 
    
    //  select min(SQRT(((80- latitude)*(80 - latitude)) + ((80 - longitude)*(80 - longitude)))) as dist ,driver_id from driver_address;

    return  res1;  
}

let getNearestDriversUsingST = async  (driver_id, address_id) =>
{
    res = await DAO.find(['customer_address'],['latitude','longitude'],`customer_address_id=${ address_id.source_id}`);
    
    res1 = await DAO.find([`driver_address INNER JOIN driver on driver_address.driver_id=driver.driver_id`],[' driver.driver_id', 'driver.driver_name', 'driver.driver_email', `sqrt(((${res[0].latitude}-driver_address.latitude)*(${res[0].latitude}-driver_address.latitude)) + ((${res[0].longitude} - driver_address.longitude)*(${res[0].longitude}-driver_address.longitude))) as dist`, `ST_Distance_Sphere(point(${res[0].latitude}, ${res[0].longitude}),point(driver_address.latitude, driver_address.longitude)) * 0.00621371192 as st_distance`],`1`, '', ` dist ASC limit 10`);
   
    return  res1;  
}

let updateBooking = async (cust_id, payload) => 
{
    await DAO.update(['booking'],[`seat='${payload.seat}', customer_address_id='${payload.source_id}', destination_latitude='${payload.destination_latitude}', destination_longitude='${payload.destination_longitude}'`],[`booking_id='${payload.booking_id}'`])
     
    res = await DAO.find(['customer_address'],['latitude','longitude'],[`customer_id='${cust_id}' AND customer_address_id='${payload.source_id}'`])
    
    return res; 
}

let cancelBooking = async (cust_id, book_id) => 
{
    res1=await DAO.find(['customer_address'],['customer_address_id'],[`customer_id='${cust_id}'`])
    if (res1)
    {
        for(let i = 0; i < res1.length; i++)
        {
            res2 = await DAO.update(['booking'],[ `status='Cancelled'` ,  `driver_id=NULL` ],[`booking_id='${book_id}' AND customer_address_id='${res1[i].customer_address_id}'`])
        }
        if(res2.affectedRows == 1)
        {
            return {message:res2}
        }
        else
        {
            return {message: "Wrong Booking Id"};
        }
    }
}

let assignDriver =async (customer_address_id,driver_id)=>{
    await DAO.update('booking',[ `driver_id=${driver_id}`],`customer_address_id=${customer_address_id}`);
    return await DAO.find(['driver'],['driver_id','driver_name','driver_phone'],`driver_id=${driver_id}`)
}


module.exports = {
    insertBooking,
    getBooking,
    getNearestDrivers,
    getNearestDriversUsingST,
    updateBooking,
    cancelBooking,
    assignDriver
}
 