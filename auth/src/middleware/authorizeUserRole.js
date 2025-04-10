const httpConstants = require('../constants/statusConstants');
const info = require('../constants/responseInfo');
const logger = require('../logger/logger');

const authorizeRole = (allowedRoles) => {
    return (req,res,next) => {
        try{
        const _role = req.role;
        const validRole = allowedRoles.includes(_role);
        if(validRole){
            logger.info(`SERVICE: ${info.SERVICE_NAME} | MESSAGE:${info.ROLE_VALIDATION}`);
          next();
        }
        else{
            logger.info(`SERVICE: ${info.SERVICE_NAME} | MESSAGE:${info.ACCESS_DENIED}`);
           return res.status(httpConstants.UNAUTHORIZED).json({message:info.ACCESS_DENIED});
        }
        
    }
        catch(err){
            logger.info(`SERVICE: ${info.SERVICE_NAME} | ERR-MESSAGE:${info.ERROR_VALIDATING_ROLE}`,err);
        return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({message:info.ERROR_VALIDATING_ROLE,Error:err.message});
        }    
    }
}

module.exports = {
    authorizeRole
}