const {pool,quest_kho,ans_kho} = require('../models/kho.model');
const ApiError = require('../utils/ApiError');
const {ans_thongke} = require('../models/bailam.model');

const getAllkhoAdmin = async ()=>{
    let query = "SELECT * FROM getAllkhoAdmin()"
    let [results, metadata] = await pool.query(query);
    var j = -1;
    const final = [];
    results.forEach((item,index)=>{
        if(j == -1 || final[j].quest_kho_id != item.quest_kho_id){
            j++;
            final.push({
                quest_kho_id:item.quest_kho_id, 
                created_id:item.created_id,
                quest_kho_content:item.quest_kho_content,
                cautraloi:[]
            });
        }
        final[j].cautraloi.push({
            ans_kho_content:item.ans_kho_content,
            isCorrect:item.iscorrect
        });
    });
    if(!results.length){
        throw new ApiError(404,'Not found');
    }
    return final;
};
const getkhoById = async (quest_kho_id)=>{
    let query = `SELECT * FROM getkhoById(${quest_kho_id})`;
    let [results, metadata] = await pool.query(query);
    var j = -1;
    const final = [];
    results.forEach((item,index)=>{
        if(j == -1 || final[j].quest_kho_id != item.quest_kho_id){
            j++;
            final.push({
                quest_kho_id:item.quest_kho_id, 
                created_id:item.created_id,
                quest_kho_content:item.quest_kho_content,
                cautraloi:[]
            });
        }
        final[j].cautraloi.push({
            ans_kho_content:item.ans_kho_content,
            ans_kho_id:item.ans_kho_id
        });
    });
    if(!results.length){
        throw new ApiError(404,'Not found');
    }
    return final;
};
const updatekhoByIdAdmin = async (id,updateBody,created_id)=>{
    const {quest_kho_id,quest_kho_content,cautraloi} = updateBody;
    const exist = await getkhoById(id);
    if(exist&&id==quest_kho_id){
        const results = await quest_kho.update({quest_kho_content,created_id},{where:{quest_kho_id}});
        await ans_kho.findAll({where:{quest_kho_id}}).then((ans)=>{
           for(let i=0;i<ans.length;i++){
                if(cautraloi[i]){
                    ans[i].set({ans_kho_content:cautraloi[i].content,iscorrect:cautraloi[i].isCorrect});
                    ans[i].save();
                }
           }
        });
        await ans_thongke.findAll({where:{quest_kho_id}}).then((ans)=>{
            for(let i=0;i<ans.length;i++){
                 if(cautraloi[i]){
                    ans[i].set({created_id,ans_cham:cautraloi[i].isCorrect});
                    ans[i].save();
                 }
            }
         });
        return results;
    }else{
        throw new ApiError(400,'Bad request');
    }
};
const addkhoAdmin = async (updateBody,created_id)=>{
    const {quest_kho_content,cautraloi} = updateBody;
    const results = await quest_kho.create({quest_kho_content,created_id});
    const quest_kho_id = results.quest_kho_id;
    for(let i = 0;i<cautraloi.length;i++){
        await ans_kho.create({quest_kho_id,created_id,ans_kho_content:cautraloi[i].content,iscorrect:cautraloi[i].isCorrect});
    }
    if(!results){
        throw new ApiError(400,'Bad request');
    }
    return results;
};
const deletekhoByIdAdmin = async (quest_kho_id)=>{
    await ans_kho.destroy({where:{quest_kho_id}});
    const results = await quest_kho.destroy({where:{quest_kho_id}});
    if(!results){
        throw new ApiError(404,'Not found');
    }
    return results;
};
module.exports = {
    getAllkhoAdmin,
    getkhoById,
    updatekhoByIdAdmin,
    addkhoAdmin,
    deletekhoByIdAdmin,
}