const { khoService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getAllkhoAdmin = catchAsync(async (req,res)=>{
    const results = await khoService.getAllkhoAdmin();
    res.status(200).json(results);
});
const getkhoById = catchAsync(async (req,res)=>{
    const results = await khoService.getkhoById(req.params.id);
    res.status(200).json(results);
});
const updatekhoByIdAdmin = catchAsync(async (req,res)=>{
    const results = await khoService.updatekhoByIdAdmin(req.params.id,req.body,res.user_id);
    res.status(200).json('Update thanh cong');
});
const addkhoAdmin = catchAsync(async (req,res)=>{
    const results = await khoService.addkhoAdmin(req.body,res.user_id);
    res.status(200).json('Them thanh cong');
});
const deletekhoByIdAdmin = catchAsync(async (req,res)=>{
    const results = await khoService.deletekhoByIdAdmin(req.params.id);
    res.status(200).json('Xoa thanh cong');
});
module.exports = {
    getAllkhoAdmin,
    getkhoById,
    updatekhoByIdAdmin,
    addkhoAdmin,
    deletekhoByIdAdmin,
}