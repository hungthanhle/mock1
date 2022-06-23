const express = require('express');
const auth = require('../middlewares/auth');
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
/**
 * @swagger
 * tags:
 *   name: De
 *   description: De
 */
/**
 * @swagger
 * /de:
 *   get:
 *     tags: [De]
 *     description: Admin gets all tests and teacher in storage.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: created_id
 *         schema:
 *           type: number
 *         description: Nguoi tao de
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. de_so:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 2
 *         description: Maximum number of de
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *     tags: [De]
 *     description: Admin adds test and questions.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mo_ta_de:
 *                 type: string
 *               time_start:
 *                 type: string
 *                 format: date-time
 *               time_end:
 *                 type: string
 *                 format: date-time
 *               cauhoi:
 *                 type: array
 *                 items:
 *                   type: number
 *             example:
 *               mo_ta_de: Kiểm tra 15 phút, môn Toán
 *               time_start: 2016-07-07T10:01:18.410Z
 *               time_end: 2016-07-07T10:44:18.410Z
 *               cauhoi: [1,5,3]
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
 * /de/{id}:
 *   get:
 *     tags: [De]
 *     description: Get test and questions by test number.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *   put:
 *     tags: [De]
 *     description: Admin updates test and questions by test number.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: test number
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
 *               mo_ta_de:
 *                 type: string
 *               time_start:
 *                 type: string
 *                 format: date-time
 *               time_end:
 *                 type: string
 *                 format: date-time
 *               cauhoi:
 *                 type: array
 *                 items:
 *                   type: number
 *             example:
 *               de_so: 1
 *               mo_ta_de: Kiểm tra 15 phút, môn Toán
 *               time_start: 2016-07-07T10:01:18.410Z
 *               time_end: 2016-07-07T10:44:18.410Z
 *               cauhoi: [1,5,3]
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *
 *   delete:
 *     tags: [De]
 *     description: Admin deletes test and questions by test number.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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