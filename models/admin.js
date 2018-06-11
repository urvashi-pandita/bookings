const boom = require('boom');
module.exports = {
    sql_admin: async () => {
        try {
            await con.query(`create table if not exists admin(
                admin_id int AUTO_INCREMENT not null ,
                admin_name varchar(20), 
                admin_phone varchar(15), 
                admin_email varchar(20), 
                admin_password varchar(20), 
                date timestamp default current_timestamp, 
                PRIMARY KEY(admin_id)
                );
            `);
            await con.query(`select * from admin where admin_email='admin1@gmail.com'`, async (err, data) => {

                if (!data) {
                    await con.query(`insert into admin(admin_name, admin_phone, admin_email, admin_password)
                        values('admin1', '9478704255', 'admin1@gmail.com', 'admin1')`);

                }
            });
            await con.query(`select * from admin where admin_email='admin2@gmail.com'`, async (err, data) => {

                if (!data) {
                    await con.query(`insert into admin(admin_name, admin_phone, admin_email, admin_password)
                        values('admin2', '7986511877', 'admin2@gmail.com', 'admin2')`);
                }

            })

        } catch (error) {
            console.log("Admin", error);
            boom.badData('admin table error');
        }

    }

}