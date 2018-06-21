const mysql = require('mysql'); 
global.con =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'1234olchi',
    debug: ['ComQueryPacket', 'ResultSetHeaderPacket']
});
let connection= async function(){ 
 try {
   await con.connect(); 
   await con.query(`create database if not exists expressdb`);
   await con.query(`use expressdb`);
   //Auto register 2 super admin
   console.log("Connected to SQL");
   
 } catch (error) {
    console.log("Error in connecting to database");
    return error;
 }
    
}
module.exports = connection;