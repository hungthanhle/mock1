const express = require('express');
const {login,register} = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');

const router = express.Router();

router.route('/login').post(validate(authValidation.login),login);
router.route('/register').post(validate(authValidation.register),register);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
/**
 * @swagger
 * /login:
 *   post:
 *     description: Post account to login.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: 'hungadmin1'
 *               password: '1234'
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not Found
 */