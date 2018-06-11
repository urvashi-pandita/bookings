const boom = require('boom');
module.exports = {
     sql_driver : async ()=>{
        try {
            await con.query(`create table if not exists driver(
                driver_id int AUTO_INCREMENT not null,
                driver_name varchar(20), 
                driver_phone varchar(15), 
                driver_email varchar(40), 
                driver_password varchar(20), 
                date timestamp default current_timestamp,
                status int, 
                PRIMARY KEY(driver_id)
                );
         `) 
        } catch (error) {
            console.log(error);
            boom.badData('driver table error');
        } 
      
    } 
    
}