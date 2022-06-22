const express = require('express');
const auth = require('../middlewares/auth');
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
/**
 * @swagger
 * tags:
 *   name: Kho
 *   description: Kho
 */
/**
 * @swagger
 * /kho:
 *   get:
 *     tags: [Kho]
 *     description: Admin gets all questions and answers in storage.
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
 *     tags: [Kho]
 *     description: Admin adds question and answers.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quest_kho_content:
 *                 type: string
 *               cautraloi:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     isCorrect:
 *                       type: boolean
 *             example:
 *               quest_kho_content: Thực hiện phép tính 1 + 1 =
 *               cautraloi: [{"content": "A. 2","isCorrect": true},{"content": "B. 3","isCorrect": false}]
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
 * /kho/{id}:
 *   get:
 *     tags: [Kho]
 *     description: Get question and answers by question id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: question id
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
 *     tags: [Kho]
 *     description: Admin updates question and answers by question id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: question id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quest_kho_id:
 *                 type: number
 *               quest_kho_content:
 *                 type: string
 *               cautraloi:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     isCorrect:
 *                       type: boolean
 *             example:
 *               quest_kho_id: 1
 *               quest_kho_content: Thực hiện phép tính 1 + 1 =
 *               cautraloi: [{"content": "A. 2","isCorrect": true},{"content": "B. 3","isCorrect": false}]
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
 *     tags: [Kho]
 *     description: Admin deletes question and answers by question id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: question id
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