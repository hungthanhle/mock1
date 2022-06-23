const { deService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const getAlldeAdmin = catchAsync(async (req,res)=>{
    const filter = pick(req.query, ['create_id']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const results = await deService.getAlldeAdmin(filter,options);
    res.status(200).json(results);
});
const getdeById = catchAsync(async (req,res)=>{
    const results = await deService.getdeById(req.params.id);
    res.status(200).json(results);
});
const adddeAdmin = catchAsync(async (req,res)=>{
    const results = await deService.adddeAdmin(req.body,res.user_id);
    res.status(200).json('Them thanh cong');
});
const deletedeByIdAdmin = catchAsync(async (req,res)=>{
    const results = await deService.deletedeByIdAdmin(req.params.id);
    res.status(200).json('Xoa thanh cong');
});
const updatedeByIdAdmin = catchAsync(async (req,res)=>{
    const results = await deService.updatedeByIdAdmin(req.params.id,req.body,res.user_id);
    res.status(200).json('Update thanh cong');
});
module.exports = {
    getAlldeAdmin,
    getdeById,
    adddeAdmin,
    deletedeByIdAdmin,
    updatedeByIdAdmin,
}