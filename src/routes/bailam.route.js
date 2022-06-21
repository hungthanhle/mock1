const express = require('express');
const {auth} = require('../controllers/auth.controller');
const bailamController = require('../controllers/bailam.controller');
const router = express.Router();
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');

router.route('/')
    .get(auth('level2'),bailamController.getAllbailamAdmin);

router.route('/:id')
    .delete(auth('level2'),bailamController.deletebailamByIdAdmin)
    .get(auth('level1'),bailamController.getbailamById)
    .post(validate(authValidation.addbailamById),auth('level1'),bailamController.addbailamById);

module.exports = router;