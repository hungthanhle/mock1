const { bailamService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getAllbailamAdmin = catchAsync(async (req,res)=>{
    const results = await bailamService.getAllbailamAdmin(req.query.de);
    res.status(200).json(results);
});
const addbailamById = catchAsync(async (req,res)=>{
    const id = req.params.id;
    const results = await bailamService.addbailamById(id,req.body,res.user_id);
    res.status(200).json('Them thanh cong');
});
const deletebailamByIdAdmin = catchAsync(async (req,res)=>{
    const results = await bailamService.deletebailamByIdAdmin(req.params.id,req.query.de);
    res.status(200).json('Xoa thanh cong');
});
const getbailamById = catchAsync(async (req,res)=>{
    const results = await bailamService.getbailamById(req.params.id,req.query.de);
    res.status(200).json(results);
});
module.exports = {
    getAllbailamAdmin,
    addbailamById,
    deletebailamByIdAdmin,
    getbailamById,
}