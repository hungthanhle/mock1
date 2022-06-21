const {pool,de,quest_thongke} = require('../models/de.model');
const {quest_kho}= require('../models/kho.model');
const ApiError = require('../utils/ApiError');

const adddeAdmin = async (updateBody,created_id)=>{
    const {mo_ta_de,time_start,time_end,cauhoi} = updateBody;
    const results = await de.create({mo_ta_de,created_id,time_start,time_end});
    const de_so = results.de_so;
    for(let i = 0;i<cauhoi.length;i++){
        await quest_thongke.create({de_so,quest_kho_id:cauhoi[i]})
    }
    return results;
};
const getdeById = async (de_so)=>{
    let query = `SELECT * FROM getdeById(${de_so})`;
    let [results, metadata] = await pool.query(query);
    var j = -1;
    const final = [];
    results.forEach((item,index)=>{
        if(j == -1 || final[j].de_so != item.de_so){
            j++;
            final.push({
                de_so:item.de_so,
                mo_ta_de: item.mo_ta_de,
                created_id:item.created_id,
                time_start:item.time_start,
                time_end: item.time_end,
                cauhoi:[]
            });
        }
        final[j].cauhoi.push(item.quest_kho_id);
    });
    if(!results.length){
        throw new ApiError(404,'Not found');
    }
    return final;
};
const updatedeByIdAdmin = async (id,updateBody,created_de_id)=>{
    const {mo_ta_de,de_so,time_start,time_end,cauhoi} = updateBody;
    const exist = await getdeById(id);
    if(exist&&id==de_so){
        const results = await de.update({mo_ta_de,time_start,time_end,created_id:created_de_id},{where:{de_so}});
        await quest_thongke.findAll({where:{de_so:id}}).then(async(quest)=>{
           for(let i=0;i<quest.length;i++){
                let {created_id} = await quest_kho.findOne({where:{quest_kho_id:cauhoi[i]}});
                await quest[i].set({quest_kho_id:cauhoi[i],created_id});
                await quest[i].save();
           }
        });
        return results;
    }else{
        throw new ApiError(400,'Bad request');
    }
};
const getAlldeAdmin = async ()=>{
    const results = await de.findAll();
    return results;
};
const deletedeByIdAdmin = async (de_so)=>{
    await quest_thongke.destroy({where:{de_so}});
    const results = await de.destroy({where:{de_so}});
    if(!results){
        throw new ApiError(404,'Not found');
    }
    return results;
};
module.exports = {
    getAlldeAdmin,
    getdeById,
    adddeAdmin,
    deletedeByIdAdmin,
    updatedeByIdAdmin,
}