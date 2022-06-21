const express = require('express');
const {auth} = require('../controllers/auth.controller');
const deController = require('../controllers/de.controller');

const router = express.Router();
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');

router.route('/')
  .get(auth('level2'),deController.getAlldeAdmin)
  .post(validate(authValidation.adddeAdmin),auth('level2'),deController.adddeAdmin);

router.route('/:id')
  .get(auth('level1'),deController.getdeById)
  .put(validate(authValidation.updatedeById),auth('level2'),deController.updatedeByIdAdmin)
  .delete(auth('level2'),deController.deletedeByIdAdmin);

module.exports = router;