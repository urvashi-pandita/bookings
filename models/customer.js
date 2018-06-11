const boom = require('boom');
module.exports = {
     sql_cust : async ()=>{
        try {
            await con.query(`create table if not exists customer(
                customer_id int AUTO_INCREMENT not null,
                customer_name varchar(20), 
                customer_phone varchar(15), 
                customer_email varchar(40), 
                customer_password varchar(20), 
                OTP int,
                is_verified varchar(3) DEFAULT "no" check (is_verified="no" or is_verified="yes"),
                date timestamp default current_timestamp, 
                PRIMARY KEY(customer_id)
                );
         `) 
        } catch (error) {
            console.log(error);
            boom.badData('customer table error');
        } 
      
    } 
    
}