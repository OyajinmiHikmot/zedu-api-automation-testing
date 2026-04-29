const axios = require("axios"); 
require("dotenv").config(); 



async function getTestData() { 
    const response = await axios.post(`${process.env.BASE_URL}/auth/login`, 
    { email: process.env.EMAIL, password: process.env.PASSWORD }); 

    return {
        token: response.data.data.access_token,
        user_id: response.data.data.user.id,
    };
} 
module.exports = { getTestData };