const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../docs/swaggerDef');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/routes/*.js'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;

/**
 * @swagger
 * /login:
 *   post:
 *     description: Post account to login.
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
/**
 * @swagger
 * /kho:
 *   get:
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
/**
 * @swagger
 * /de:
 *   get:
 *     description: Admin gets all tests and teacher in storage.
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
 *     description: Admin adds test and questions.
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
 *     description: Get test and questions by test number.
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
 *     description: Admin updates test and questions by test number.
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
 *     description: Admin deletes test and questions by test number.
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
/**
 * @swagger
 * /bailam:
 *   get:
 *     description: Admin gets all tests from students by test number.
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
 *     description: Get test by test number from student by student id.
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
 *     description: Student send test and questions by student id.
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
 *     description: Admin deletes student's test by student id test number.
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