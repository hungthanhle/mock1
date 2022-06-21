const express = require('express');
const {auth} = require('../controllers/auth.controller');
const khoController = require('../controllers/kho.controller');

const router = express.Router();
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');

router.route('/')
    .get(auth('level2'),khoController.getAllkhoAdmin)
    .post(validate(authValidation.addkhoByIdAdmin),auth('level2'),khoController.addkhoAdmin);

router.route('/:id')
    .get(auth('level1'),khoController.getkhoById)
    .put(validate(authValidation.updatekhoAdmin),auth('level2'),khoController.updatekhoByIdAdmin)
    .delete(auth('level2'),khoController.deletekhoByIdAdmin);

module.exports = router;