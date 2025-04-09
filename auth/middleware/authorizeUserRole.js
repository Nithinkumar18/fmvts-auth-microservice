const httpConstants = require('../constants/statusConstants');
const info = require('../constants/responseInfo');

const authorizeRole = (allowedRoles) => {
    return (req,res,next) => {
        try{
        const _role = req.role;
        const validRole = allowedRoles.includes(_role);
        if(validRole){
          next();
        }
        else{
           return res.status(httpConstants.UNAUTHORIZED).json({message:info.ACCESS_DENIED});
        }
        
    }
        catch(err){
        return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({message:info.ERROR_VALIDATING_ROLE,Error:err.message});
        }    
    }
}

module.exports = {
    authorizeRole
}