const express = require('express');
const {login,register,logout,refreshToken} = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');

const router = express.Router();

router.route('/login').post(validate(authValidation.login),login);
router.route('/register').post(validate(authValidation.register),register);
router.route('/logout').post(validate(authValidation.logout),logout);
router.route('/refresh-tokens').post(validate(authValidation.refreshToken),refreshToken);

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
 * /register:
 *   post:
 *     description: Register account.
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
 *               role:
 *                 type: string
 *             example:
 *               username: 'hungadmin1'
 *               password: '1234'
 *               role: 'admin'
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not Found
 *
 * /logout:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTY1NTg4OTMwM30._q9ta8SGz9RY_lrJaY11pdVEhw3_2ocOMwDbvIm2gGM
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Not Found
 *
 * /refresh-tokens:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTY1NTg4OTMwM30._q9ta8SGz9RY_lrJaY11pdVEhw3_2ocOMwDbvIm2gGM
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         description: Not Found
 */