const DAO = require('../DAO.js');
let checkEmail = async(email) => {
    return await DAO.find(['driver'],['*'],`driver_email='${email}'`);
    //     con.query(`select * from driver where driver_email='${email}'`, (err, result) => {
    //         if (err) reject(err);
    //         resolve(result);
    //     })
    // })
}

let register = async(data) => {
    fields=['driver_name', 'driver_phone', 'driver_email', 'driver_password'];
    values=[data.name, data.phone, data.email, data.password];
    res1= await DAO.insert('driver', fields, values);
    return res1;
//         con.query(`insert into driver (driver_name, driver_phone, driver_email, driver_password) values('${data.name}', '${data.phone}', '${data.email}', '${data.password}')`, (err, result) => {
//             if (err) reject(err);
//             resolve(result)
//         })
//     })
}

let login = async(email, password) => {
    return await DAO.find(['driver'],['*'],`driver_email='${email}' and driver_password='${password}'`)
    //     con.query(`select * from driver where driver_email='${email}' and driver_password='${password}'`, (err, result) => {
    //         if (err) reject(err);
    //         resolve(result);
    //     })
    // })
}

let getBooking = async (id) => {
    console.log(id);
    return await DAO.find(['booking b', 'customer_address ca', 'customer c'],['*'],`b.driver_id='${id}' AND b.customer_address_id=ca.customer_address_id AND ca.customer_id=c.customer_id`);
    //     con.query(`select * from booking b, customer_address ca, customer c where b.driver_id='${id}' AND b.customer_address_id=ca.customer_address_id AND ca.customer_id=c.customer_id`, (err, resp) => {
    //         if (err) reject(err)
    //         resolve(resp)
    //     })
    // })
}

let taskDone = async(driver_id, booking_id) => {
    res1=await DAO.update(['driver'],['status=0',`driver_id=${driver_id}`]);
        // con.query(`update driver set status=0 where driver_id=${driver_id}`, (err, resp) => {
        //     if (err) reject(err);
        if(!res1)
        {
            return 0;
        }
        res2= await DAO.update(['booking'],[' driver_id=NULL'],`booking_id=${booking_id}`);
                // con.query(`update booking set driver_id=NULL where booking_id=${booking_id}`, async (err, result) => {
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
    //                 resolve();
    //             });
    //         }
    //     });
    // });
    return res2;
}

module.exports = {
    checkEmail,
    register,
    login,
    getBooking,
    taskDone
}