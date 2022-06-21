const Joi = require('joi');

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
const addbailamById = {
    body: Joi.object().keys({
      de_so: Joi.number().required(),
      time_start: Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})\T([0-9]{2})\:([0-9]{2})/),
      cautraloi: Joi.array().items(Joi.object().keys({
            quest_kho_id: Joi.number().required(),
            ans_kho_id: Joi.number().required()
      }))
    }),
};
const updatekhoByIdAdmin = {
    body: Joi.object().keys({
        quest_kho_id: Joi.number().required(),
        quest_kho_content: Joi.string().required(),
        cautraloi: Joi.array().items(Joi.object().keys({
            content:Joi.string().required(),
            isCorrect:Joi.boolean().required()
        }))
    }),
};
const addkhoAdmin = {
    body: Joi.object().keys({
        quest_kho_content: Joi.string().required(),
        cautraloi: Joi.array().items(Joi.object().keys({
            content:Joi.string().required(),
            isCorrect:Joi.boolean().required()
        }))
    }), 
};
const adddeAdmin = {
    body: Joi.object().keys({
        mo_ta_de: Joi.string().required(),
        time_start: Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})\T([0-9]{2})\:([0-9]{2})/),
        time_end: Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})\T([0-9]{2})\:([0-9]{2})/),
        cauhoi: Joi.array().items(Joi.number().required())
    }),
}
const updatedeById = {
    body: Joi.object().keys({
        de_so: Joi.number().required(),
        mo_ta_de: Joi.string().required(),
        time_start: Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})\T([0-9]{2})\:([0-9]{2})/),
        time_end: Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})\T([0-9]{2})\:([0-9]{2})/),
        cauhoi: Joi.array().items(Joi.number().required())
    }),
}
const register = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
    })
}
module.exports = {
  login,
  addbailamById,
  updatekhoByIdAdmin,
  addkhoAdmin,
  adddeAdmin,
  updatedeById,
  register,
};
