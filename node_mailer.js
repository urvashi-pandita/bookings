// const nodemailer = require('nodemailer');
// nodemailer.createTestAccount((err, account) =>{
//     let transporter = nodemailer.createTransport{
//     // service:"gmail",
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth:{
//         user:'abc123@gmail.com',
//         pass: 'abc123'
//     }
// }
// });

// let mailOptions={
//     from: 'abc123@gmail.com',
//     to: 'defgh@gmail.com' ,
//     subject: "sending mail through node js",
//     text: "mail through node js"
// };

// transporter.sendMail(mailOptions, function(err,info)
// {
//     if(error)
//     {
//         return err;
//     }
//     else{
//         console.log("email sent", +info.response);
//     }
// });