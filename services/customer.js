const DAO = require ('../DAO.js');

let checkEmail = async(email) => 
{
    console.log(email);
    return await DAO.find(['customer'],['*'],`customer_email='${email}'`); 
}

let register = async(data, otp) => {
    fields=['customer_name', 'customer_phone', 'customer_email', 'customer_password', 'OTP'];
    values=[data.name, data.phone, data.email, data.password, otp]; 
    return await DAO.insert('customer',fields,values);
}  

let login = async(email, password) => {
    return await DAO.find(['customer'],['*'],`customer_email='${email}' and customer_password='${password}'`)
} 

let checkOtp = async(id, otp) => {
    return await DAO.find(['customer'],['*'],`customer_id='${id}' and OTP='${otp}'` );
}

let updateAccount = async(id) => {
    return await DAO.update(['customer'],[`is_verified='yes' `],`customer_id='${id}'`)
}

let addAddress = async(id, data) => { 
    fields = ['customer_id','detailed_address', 'latitude', 'longitude'],
    values = [id, data.detail, data.latitude, data.longitude]
    res = await DAO.insert(['customer_address'],fields,values); 
    console.log("res------------->",res);
    return res;
}

let getAllAddresses = async(id) => {
    return await DAO.find(['customer_address'],['*'],`customer_id='${id}'`); 
}

module.exports = {
    checkEmail,
    register,
    login,
    checkOtp,
    updateAccount,
    addAddress,
    getAllAddresses
}