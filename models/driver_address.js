const boom = require("boom");

module.exports = {
    sql_loc: async () => {
        try {
            await con.query(`create table if not exists driver_address(
                driver_address_id int AUTO_INCREMENT not null,
                driver_id int,
                detailed_address varchar(100),
                latitude float,
                longitude float,
                date timestamp DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY(driver_address_id),
                FOREIGN KEY(driver_id) references driver(driver_id)
            );`)
        } catch (error) {
            return boom.badData("driver address table error");
        }
    }
}