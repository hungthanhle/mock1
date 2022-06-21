const AuthModel = require('../models/auth.model.js');
const ApiError = require('../utils/ApiError');
const tokens = require('../config/tokens.js');
const Token = require('../models/token.model.js');
const tokenService = require('../services/token.service.js');

const AuthByUsernamePassword = async (username,password)=>{
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
    const exist = await AuthModel.findOne({where:{user_name:username}})
    const results = await AuthModel.create({user_name:username,password:password,role:role});
    if(!exist){
        throw new ApiError(400,'Bad request');
    }
    return results
}
const logout = async (refreshToken)=>{
    const refreshTokenDoc = await Token.findOne({where:{token:refreshToken,type:tokens.REFRESH}});
    if(!refreshTokenDoc){
        throw new ApiError(404,'Not found');
    }
    await refreshTokenDoc.remove();
};
const refreshAuth = async (refreshToken)=>{
    try{
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken,tokens.REFRESH);
        const user = AuthByUserId(refreshToken.user_id);
        await refreshTokenDoc.remove();
        return tokenService.generateAuthTokens(user.user_id);
    }catch{
        throw new ApiError(401,'Unauthorized');
    }
};
module.exports = {
    AuthByUsernamePassword,
    AuthByUserId,
    createUser,
    logout,
    refreshAuth,
}