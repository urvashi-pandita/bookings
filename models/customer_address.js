const boom = require("boom");

module.exports = {
    sql_addr: async () => {
        try {
            await con.query(`create table if not exists customer_address(
                customer_address_id int AUTO_INCREMENT not null,
                customer_id int,
                detailed_address varchar(100),
                latitude float,
                longitude float,
                date timestamp DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY(customer_address_id),
                FOREIGN KEY(customer_id) references customer(customer_id)
            );`)
        } catch (error) {
            return boom.badData("customer address table error");
        }
    }
}