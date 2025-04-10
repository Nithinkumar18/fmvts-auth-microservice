const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const info = require('../constants/responseInfo');
const logger = require('../logger/logger');

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
              logger.info(`SERVICE: ${info.SERVICE_NAME} | MESSAGE:${info.TOKEN_GENERATED}`);
              return {token}
            }
            else{
                logger.info(`SERVICE: ${info.SERVICE_NAME} | MESSAGE:${info.INVALID_PASSWORD}`);
               return{
               
                  message: info.INVALID_PASSWORD
               }
            }
        }
        else{
            logger.info(`SERVICE: ${info.SERVICE_NAME} | MESSAGE:${ info.INVALID_USER_CREDENTIALS}`);
            return{
                message: info.INVALID_USER_CREDENTIALS
            }
        }
    }
    catch(err){
        logger.error(`SERVICE: ${info.SERVICE_NAME} | ERR-MESSAGE:${info.ERR_LOGIN}`,err);
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
          logger.info(`SERVICE: ${info.SERVICE_NAME} | MESSAGE:${ info.USER_REGESTRATION}`);
          return {
             userId,createdAt
          }
       }
       else{
        logger.info(`SERVICE: ${info.SERVICE_NAME} | MESSAGE:${ info.INCOMPLETE_USERDATA}`);
          return {
            message: info.INCOMPLETE_USERDATA
          }
       }
    }
    catch(err){
        logger.error(`SERVICE: ${info.SERVICE_NAME} | ERR-MESSAGE:${info.ERR_USER_REGESTRATION}`,err);
        throw err;
    }
}

module.exports = {
    userLogin,
    userRegister
}