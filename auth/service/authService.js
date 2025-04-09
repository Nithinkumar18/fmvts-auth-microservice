const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const info = require('../constants/responseInfo');

const userLogin = async (userEmail,userPass) => {
    try{
       const _validUser = await axios.get(`${process.env.USERMICROSERVICEURL}/user/v1/by-email`,{ params:{email:userEmail}})
       const _userData = _validUser.data;
        if(_userData){
            const _pass = _userData.password;
            const {email,role} = _userData;
            const isValidUser = await bcrypt.compare(userPass,_pass);
            if(isValidUser){
              const token = jwt.sign({email,role},process.env.SECRET,{expiresIn:'900sec'});
              return {token}
            }
            else{
               return{
                  message: info.INVALID_PASSWORD
               }
            }
        }
        else{
            return{
                message: info.INVALID_USER_CREDENTIALS
            }
        }
    }
    catch(err){
        throw err;
    }
}


const userRegister = async(userData) => {
    try{
       const _createUser = await axios.post(`${process.env.USERMICROSERVICEURL}/user/v1/signUp`,userData);
       const user = _createUser.data;
       if(user){
          const userId = user._id;
          const createdAt = user.createdAt;
          return {
             userId,createdAt
          }
       }
       else{
          return {
            message: info.INCOMPLETE_USERDATA
          }
       }
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    userLogin,
    userRegister
}