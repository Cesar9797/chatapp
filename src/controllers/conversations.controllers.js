const {ConversationsServices} = require('../services');

const getUserConversations = async (req, res, next) => {
  try {
    const {id} = req.params;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 3;
    const conversations = await ConversationsServices.getByUserId(id, offset, limit);
    res.json(conversations);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: 'Algo salio mal durante la petición'
    })
  }
}

const getMessagesConversations = async (req, res, next) => {
  try {
    const {conversationId} = req.params;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    const conversationData = await ConversationsServices.getMessagesByIdConversation(conversationId, offset, limit);
    res.json(conversationData);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: " Algo salio mal durante la obtención "
    })
  }
}

const createMessageInConversation = async (req, res, next) => {
  try {
    const data = req.body; // De aqui sacamos senderId y Message
    let {conversationId} = req.params;
    conversationId = Number(conversationId)
    const result = await ConversationsServices.createMessage({...data, conversationId});
    res.json(result);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: ''
    })
  }
}

const getMessages = async (req, res, next) => {
  try {
    const {conversationId} = req.params;
    const offset = Number(req.query.offset || 0);
    const limit = Number(req.query.limit || 20);
    const messages = await ConversationsServices.getMessages(conversationId, offset, limit);
    res.json(messages);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: ''
    })
  }
}

  const createConversation = async (req, res, next) => {
    try {
      // creator, title, participants
      const data = req.body;
      // data = {createdBy, title, participants: [1, 2] }
      const result = await ConversationsServices.create(data);
      res.json(result);
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'Algo salió mal con la creación de la conversación'
      })
    }
  }


module.exports = { getUserConversations,
  getMessagesConversations,
  createMessageInConversation,
  createConversation,
  getMessages
}