const boom = require("boom");

module.exports = {
    sql_book: async () => {
        try {
            await con.query(`create table if not exists booking(
                booking_id int auto_increment not null,
                booking_title varchar(100),
                seat int,
                customer_address_id int,
                destination_latitude float,
                destination_longitude float,
                price int,
                status varchar(20),
                date timestamp default current_timestamp,
                driver_id int,
                primary key(booking_id),
                foreign key(driver_id) references driver(driver_id),
                FOREIGN KEY(customer_address_id) references customer_address(customer_address_id)              
            );`)
        } catch (error) {
            return boom.badData("booking table error");
        }
    }
}