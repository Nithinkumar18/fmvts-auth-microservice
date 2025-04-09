const httpConstants = require('../constants/statusConstants');
const info = require('../constants/responseInfo');
const authService = require('../service/authService');


const login = async (req,res) => {
    try{
       const uemail = req.email;
       const upassword = req.password;
       const validatedUser = await authService.userLogin(uemail,upassword);
       if(validatedUser.token){
          return res.status(httpConstants.SUCCESS).json({message:info.LOGIN_SUCCESS,token:validatedUser.token});
       }
       else{
         return res.status(httpConstants.NOT_FOUND).json({message:validatedUser.message});
       }
    }
    catch(err){
        return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({message:info.ERR_LOGIN,error:err.message});
    }
}

const signUp = async (req,res) => {
    try{
        const userDetails = req.body;
        const user_regestered = await authService.userRegister(userDetails);
        if(user_regestered){
            return res.status(httpConstants.CREATED).json({message:info.USER_REGESTRATION,userId:user_regestered.userId,recordCreated: user_regestered.createdAt});
        }
        else{
            return res.status(httpConstants.BAD_REQUEST).json({message:user_regestered.message});
        }
    }
    catch(err){
        return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({message:info.ERR_USER_REGESTRATION,error:err.message});
    }
}


module.exports = {
    login,
    signUp
}