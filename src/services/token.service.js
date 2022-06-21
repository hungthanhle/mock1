const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const tokens = require('../config/tokens.js');
const Token = require('../models/token.model.js');

const generateToken = (user_id, type, secret = config.jwt.secret) => {
    const payload = { 
        user_id: user_id,
        type: type,
    };
    return jwt.sign(payload, secret);
};

const generatePayload = async (token) => {
    const payload = jwt.verify(token, config.jwt.secret);
    if (!payload) {
      throw new Error('Khong hop le');
    }
    return payload;
};

const saveToken = async (token, user_id, type) => {
    const tokenDoc = await Token.create({
      token,
      user_id,
      type,
    });
    return tokenDoc;
};
const generateAuthTokens = (user_id)=>{
    const accessToken = generateToken(user_id,tokens.ACCESS);
    const refreshToken = generateToken(user_id,tokens.REFRESH);
    await saveToken(refreshToken,user_id,tokens.REFRESH);
    return {
        accessToken,
        refreshToken,
    }
}
const verifyToken = (token, type)=>{
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({where:{token:refreshToken,user_id:payload.user_id,type:tokens.REFRESH}});
    if(!tokenDoc){
        throw new Error('Token not found');
    }
    return tokenDoc;
}
module.exports = {
    generateToken,
    generatePayload,
    generateAuthTokens,
    saveToken,
    verifyToken,
};