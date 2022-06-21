const express = require('express');
const {login,register} = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');

const router = express.Router();

router.route('/login').post(validate(authValidation.login),login);
router.route('/register').post(validate(authValidation.register),register);

module.exports = router;