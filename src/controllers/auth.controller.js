const AuthService = require('../services/auth.service.js');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const tokenService = require('../services/token.service.js');

const register = catchAsync(async (req,res)=>{
    const user = await AuthService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(200).json({message:`Dang ky thanh cong: ${user.user_name}`,tokens:tokens});
});
const login = catchAsync(async (req,res)=>{
    let { username,password } = req.body;
    const user = await AuthService.LoginByUsernamePassword(username,password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(200).json({message:`Dang nhap thanh cong: ${user.user_id}`,tokens:tokens});
});
const logout = catchAsync(async (req,res)=>{
    await AuthService.logout(req.body.refreshToken);
    res.status(204).json('Dang xuat thanh cong');
});
const refreshToken = catchAsync(async (req,res)=>{
    const tokens = await AuthService.refreshAuth(req.body.refreshToken);
    res.status(200).json(`Refresh: ${tokens.refreshToken}`);
})
module.exports = {
    login,
    register,
    login,
    logout,
    refreshToken,
}