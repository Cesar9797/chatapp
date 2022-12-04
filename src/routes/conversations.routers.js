const {Router} = require('express');

/**
 * @openapi
 * /api/v1/conversations/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get all conversations from user
 *      tags: [conversations]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: user Id
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
 *                      $ref: "#/components/schemas/conversations"
 * /api/v1/conversations/{conversationId}/messages:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get conversation by id
 *      tags: [conversations]
 *      parameters:
 *        - in: path
 *          name: conversationId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: conversation Id
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
 *                    items: {}                     
 */


const router = Router();
const authenticate = require('../middlewares/auth.middleware');
const { getUserConversations, getMessages, getMessagesConversations, createMessageInConversation, createConversation } = require('../controllers');


// obtiene todas las conversaciones de un usuario
// primera es agregar un campo para el parametro de la petición
// user id
// es poder enviar el token en la petición
router.get('/conversations/:id', authenticate, getUserConversations);
router.get('/conversations/:conversationId/messages', authenticate, getMessagesConversations);
router.post('/conversations/:conversationId/message', authenticate, createMessageInConversation);
router.post('/conversations', authenticate, createConversation );
router.get('/conversations/messages/:conversationId', authenticate, getMessages);

module.exports = router;