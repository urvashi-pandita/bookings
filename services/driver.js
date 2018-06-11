let checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        con.query(`select * from driver where driver_email='${email}'`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

let register = (data) => {
    return new Promise((resolve, reject) => {
        con.query(`insert into driver (driver_name, driver_phone, driver_email, driver_password) values('${data.name}', '${data.phone}', '${data.email}', '${data.password}')`, (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })
}

let login = (email, password) => {
    return new Promise((resolve, reject) => {
        con.query(`select * from driver where driver_email='${email}' and driver_password='${password}'`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

let getBooking = (id) => {
    return new Promise((resolve, reject) => {
        con.query(`select * from booking b, customer_address ca, customer c where b.driver_id='${id}' AND b.customer_address_id=ca.customer_address_id AND ca.customer_id=c.customer_id`, (err, resp) => {
            if (err) reject(err)
            resolve(resp)
        })
    })
}

let taskDone = (driver_id, booking_id) => {
    return new Promise((resolve, reject) => {
        con.query(`update driver set status=0 where driver_id=${driver_id}`, (err, resp) => {
            if (err) reject(err);
            else {
                con.query(`update booking set driver_id=NULL where booking_id=${booking_id}`, async (err, result) => {
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
                    resolve();
                })
            }
        })
    })
}

module.exports = {
    checkEmail,
    register,
    login,
    getBooking,
    taskDone
}