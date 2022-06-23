const express = require('express');
const auth = require('../middlewares/auth');
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
/**
 * @swagger
 * tags:
 *   name: Bailam
 *   description: Bailam
 */
/**
 * @swagger
 * /bailam:
 *   get:
 *     tags: [Bailam]
 *     description: Admin gets all tests from students by test number.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: de
 *         required: true
 *         schema:
 *           type: number
 *         description: test number
 *         example: 1
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 */
/**
 * @swagger
 * /bailam/{id}:
 *   get:
 *     tags: [Bailam]
 *     description: Get test by test number from student by student id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: student id
 *         example: 1
 *       - in: query
 *         name: de
 *         required: true
 *         schema:
 *           type: number
 *         description: test number
 *         example: 1
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *   post:
 *     tags: [Bailam]
 *     description: Student send test and questions by student id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: student id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               de_so:
 *                 type: number
 *               time_start:
 *                 type: string
 *                 format: date-time
 *               cautraloi:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     quest_kho_id:
 *                       type: number
 *                     ans_kho_id:
 *                       type: number
 *             example:
 *               de_so: 1
 *               time_start: 2016-07-07T10:01:18.410Z
 *               cautraloi: [{quest_kho_id: 2,ans_kho_id: 3},{quest_kho_id: 5,ans_kho_id: 9},{quest_kho_id: 3,ans_kho_id: 5}]
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *   delete:
 *     tags: [Bailam]
 *     description: Admin deletes student's test by student id test number.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: student id
 *         example: 1
 *       - in: query
 *         name: de
 *         required: true
 *         schema:
 *           type: number
 *         description: test number
 *         example: 1
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden 
 */