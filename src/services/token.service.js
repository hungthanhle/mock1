const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const tokenTypes = require('../config/tokens.js');
const Token = require('../models/token.model.js');

const generateToken = (user_id, type, secret = config.jwt.secret) => {
    const payload = { 
        user_id: user_id,
        type: type,
    };
    return jwt.sign(payload, secret);
};
const saveToken = async (token, user_id, type) => {
    const tokenDoc = await Token.create({
      token,
      user_id,
      type,
    });
    return tokenDoc;
};
const generateAuthTokens = async (user)=>{
    console.log("huhuhu");
    const accessToken = generateToken(user.user_id,tokenTypes.ACCESS);
    const refreshToken = generateToken(user.user_id,tokenTypes.REFRESH);
    await saveToken(refreshToken,user.user_id,tokenTypes.REFRESH);
    return {
        accessToken,
        refreshToken,
    }
}
const verifyToken = async (token, type)=>{
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({where:{token,type,user_id:payload.user_id,type:tokenTypes.REFRESH}});
    if(!tokenDoc){
        throw new Error('Token not found');
    }
    return tokenDoc;
}
module.exports = {
    generateToken,
    generateAuthTokens,
    saveToken,
    verifyToken,
};