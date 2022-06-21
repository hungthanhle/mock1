const AuthService = require('../services/auth.service.js');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const tokenService = require('../services/token.service.js');
const config = require('../config/config.js')
const allRoles = require('../config/roles.js')

const passport = async (req, res,next)=>{
    const token = req.cookies.token;
    try{
        const payload = await Token.generatePayload(token);
        const results = await AuthService.AuthByUsernameUserId(payload.username,payload.id);
        res.user_id = payload.id;
        return results
    }catch{
        next(new ApiError(401,'Unauthorized'));
    }
}
const auth = (role) => async (req, res, next) => {
    return Promise.resolve(passport(req,res,next))
        .then((results)=>{
            if(results){
                if(allRoles[role].includes(results.role)){    
                    next();
                }else{
                    next(new ApiError(403,'Forbidden'));
                }
            }else{
                next(new ApiError(401,'Unauthorized'));
            }
        });
};
const register = catchAsync(async (req,res)=>{
    const user = await AuthService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user.user_id);
    res.status(200).json({message:`Dang ky thanh cong: ${user.user_name}`,tokens:tokens});
});
const login = catchAsync(async (req,res)=>{
    let { username,password } = req.body;
    const user = await AuthService.AuthByUsernamePassword(username,password);
    const tokens = await tokenService.generateAuthTokens(user.user_id);
    res.status(200).json({message:`Dang nhap thanh cong: ${user.user_name}`,tokens:tokens});
});
const logout = catchAsync(async (req,res)=>{
    await AuthService.log(req.body.refreshToken);
    res.status(204).json('Dang xuat thanh cong');
});
const refreshToken = catchAsync(async (req,res)=>{
    const tokens = AuthService.refreshAuth(req.body.refreshToken);
    res.status(200).json(`Refresh: ${{...tokens}}`);
})
module.exports = {
    login,
    auth,
    register,
    login,
    logout,
    refreshToken,
}