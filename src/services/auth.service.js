const AuthModel = require('../models/auth.model.js');
const ApiError = require('../utils/ApiError');
const tokenTypes = require('../config/tokens.js');
const Token = require('../models/token.model.js');
const tokenService = require('../services/token.service.js');

const LoginByUsernamePassword = async (username,password)=>{
    const results = await AuthModel.findOne({where:{user_name:username,password:password}});
    if(!results){
        throw new ApiError(404,'Invalid username or password');
    }
    return results;
};
const AuthByUserId = async (id)=>{
    const results = await AuthModel.findOne({where:{user_id:id}});
    if(!results){
        throw new ApiError(401,'Unauthorized');
    }
    return results;
};
const createUser = async (updateBody)=>{
    const {username,password,role} = updateBody;
    const exist = await AuthModel.findOne({where:{user_name:username}});
    if(exist){
        throw new ApiError(400,'Bad request');
    }
    return AuthModel.create({user_name:username,password:password,role:role});
}
const logout = async (refreshToken)=>{
    const refreshTokenDoc = await Token.findOne({where:{token:refreshToken,type:tokenTypes.REFRESH}});
    if(!refreshTokenDoc){
        throw new ApiError(404,'Not found');
    }
    await refreshTokenDoc.destroy();
};
const refreshAuth = async (refreshToken)=>{
    try{
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken,tokenTypes.REFRESH);
        const user = AuthByUserId(refreshTokenDoc.user_id);
        await refreshTokenDoc.destroy();
        return tokenService.generateAuthTokens(user);
    }catch{
        throw new ApiError(401,'Unauthorized');
    }
};
module.exports = {
    LoginByUsernamePassword,
    AuthByUserId,
    createUser,
    logout,
    refreshAuth,
}