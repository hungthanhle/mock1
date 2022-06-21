const {pool,ans_thongke} = require('../models/bailam.model');
const {ans_kho} = require('../models/kho.model');
const {de} = require('../models/de.model');
const ApiError = require('../utils/ApiError');

const addbailamById = async (id,updateBody,user_id)=>{
    const {de_so,time_start,cautraloi} = updateBody;
    if(id==user_id){
        for(let i = 0; i < cautraloi.length; i++){
            const ans_kho_id = cautraloi[i].ans_kho_id;
            const {iscorrect,created_id} = await ans_kho.findOne({where:{ans_kho_id:ans_kho_id}});
            const results = await ans_thongke.create({
                user_id,de_so,quest_kho_id:cautraloi[i].quest_kho_id,ans_kho_id,time_start,ans_cham:iscorrect,created_id});
            if(!results){
                throw new ApiError(500,'Internal Server Error');
            }
        }
        return results = 1;
    }else{
        throw new ApiError(400,'Bad request');
    }
};
const deletebailamByIdAdmin = async (user_id,de_so)=>{
    const results = await ans_thongke.destroy({where:{de_so,user_id}});
    if(!results){
        throw new ApiError(404,'Not found');
    }
    return results;
};
const getbailamById = async (user_id,de_so)=>{
    let query = `SELECT * FROM getbailamById(${user_id},${de_so})`;
    let [results, metadata] = await pool.query(query);
    const final = [];
    let j = -1;
    results.forEach((item,index)=>{
        if(j == -1 || final[j].de_so != item.de_so){
            j++;
            final.push({
                user_id: item.user_id,
                de_so: item.de_so,
                time_start: item.time_start,
                time_end: item.time_end,
                cautraloi:[]
            });
        }
        final[j].cautraloi.push({
            quest_kho_id: item.quest_kho_id,
            ans_kho_id: item.ans_kho_id,
            ans_cham: item.ans_cham,
            created_id: item.created_id,
        });
    });
    if(!results.length){
        throw new ApiError(404,'Not found');
    }
    return final;
};
const getAllbailamAdmin = async (de_so)=>{
    let query = `SELECT * FROM getUserByde(${de_so})`;
    let [results, metadata] = await pool.query(query);
    const final = [];
    let j = -1;
    results.forEach((item,index)=>{
        if(j == -1 || final[j].de_so != item.de_so){
            j++;
            final.push({
                de_so: item.de_so, 
                users:[]
            });
        }
        final[j].users.push(item.user_id);
    });
    if(!results.length){
        const exist = await de.findOne({where:{de_so}});
        if(exist){
            final.push({de_so,users:[]});
        }else{
            throw new ApiError(404,'Not found');
        }
    }
    return final;
};
module.exports = {
    getAllbailamAdmin,
    addbailamById,
    getbailamById,
    deletebailamByIdAdmin,
}