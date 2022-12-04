const { Router } = require('express');
const router = Router();
const { userRegister, getAllUsers } = require('../controllers');
const authenticate = require('../middlewares/auth.middleware');

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *      summary: Register a new user into the app
 *      requestBody: 
 *        description: To register a new user you need the firstname, lastname, email, phone and password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/register"
 *      tags: [users]
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status: 
 *                    type: string
 *                    example: OK
 *                  data: 
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/users"
 *   get:
 *      security:
 *        - bearerAuth: []
 *      summary: Obtain the users in the app
 *      tags: [users]
 *      responses: 
 *        200:
 *          description: OK
 *          content:  
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *                  data:
 *                    type: array
 *                    items: 
 *                       $ref: "#/components/schemas/users"
 *                      
 */

router.post('/users', userRegister);
router.get('/users',authenticate, getAllUsers);

module.exports = router;