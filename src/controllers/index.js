const {userRegister, getAllUsers} = require('./users.controllers');
const {userLogin} = require('./auth.controllers');
const {getUserConversations, getMessages,  getMessagesConversations, createMessageInConversation, createConversation} = require('./conversations.controllers');

module.exports = {
  userRegister,
  userLogin,
  getAllUsers,
  getUserConversations,
  getMessagesConversations,
  createMessageInConversation,
  createConversation,
  getMessages
}