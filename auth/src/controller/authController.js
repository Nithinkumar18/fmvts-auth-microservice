const httpConstants = require('../constants/statusConstants');
const info = require('../constants/responseInfo');
const authService = require('../service/authService');
const logger = require('../logger/logger');


const login = async (req,res) => {
    try{
       const uemail = req.body.email;
       const upassword = req.body.password;
       const validatedUser = await authService.userLogin(uemail,upassword);
       if(validatedUser.token){
        logger.info(`SERVICE: ${info.SERVICE_NAME} | METHOD: ${req.method} | URL: ${req.url}`);
          return res.status(httpConstants.SUCCESS).json({message:info.LOGIN_SUCCESS,token:validatedUser.token});
       }
       else{
        logger.info(`SERVICE: ${info.SERVICE_NAME} | METHOD: ${req.method} | URL: ${req.url}`);
         return res.status(httpConstants.NOT_FOUND).json({message:validatedUser.message});
       }
    }
    catch(err){
        logger.error(`SERVICE: ${info.SERVICE_NAME} | METHOD: ${req.method} | URL: ${req.url} `,err);
        return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({message:info.ERR_LOGIN,error:err.message});
    }
}

const signUp = async (req,res) => {
    try{
        const userDetails = req.body;
        const user_regestered = await authService.userRegister(userDetails);
        if(user_regestered){
            logger.info(`SERVICE: ${info.SERVICE_NAME} | METHOD: ${req.method} | URL: ${req.url}`);
            return res.status(httpConstants.CREATED).json({message:info.USER_REGESTRATION,userId:user_regestered.userId,recordCreated: user_regestered.createdAt});
        }
        else{
            logger.info(`SERVICE: ${info.SERVICE_NAME} | METHOD: ${req.method} | URL: ${req.url}`);
            return res.status(httpConstants.BAD_REQUEST).json({message:user_regestered.message});
        }
    }
    catch(err){
        let error_message = err.response?.data
        logger.error(`SERVICE: ${info.SERVICE_NAME} | METHOD: ${req.method} | URL: ${req.url}`,err);
        return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({message:info.ERR_USER_REGESTRATION,Reason:error_message});
    }
}

const home = async(req,res) => {
    return res.status(httpConstants.SUCCESS).json("Welcome to Auth Service 🔐")
}

module.exports = {
    login,
    signUp,
    home
}