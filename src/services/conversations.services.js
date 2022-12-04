const {Users, Conversations, Messages, Participants} = require('../models');
require('dotenv').config();

class ConversationsServices {
  static async getByUserId (id, offset, limit) {
    try {
      const conversations = await Users.findAll({
        where: {id},
        attributes: ['id'],
        include: {
          model: Conversations,
          attributes: ['id', 'title', 'imageUrl'],
        },
        offset,
        limit,
        subQuery: false
      });
      return conversations
    } catch (error) {
      throw error
    }
  }

  static async getMessagesByIdConversation (id, offset, limit) {
    try {
      const conversationData = await Conversations.findOne({
        where: {id},
        include: [
          {
            model: Messages,
            as: 'messages',
            offset,
            limit,
          },
          {
            model: Users,
          }
        ],
      })
      return conversationData;
    } catch (error) {
      throw error
    }
  }

  static async getMessages (conversationId, offset, limit) {
    try {
      const messages = await Messages.findAndCountAll({
        where: {conversationId},
        offset,
        limit
      });
      return {
        count: messages.count,
        next: `${process.env.HOST}/api/v1${req.path}?offset=${offset+limit}&limit=${limit}`,
        previous: `${process.env.HOST}/api/v1${req.path}?offset=${offset-limit}&limit=${limit}`,
        messages: messages.rows
      }
    } catch (error) {
      throw error;
    }
  }

  static async createMessage (data) {
    try {
      const result = await Messages.create(data);
      console.log(result);
      return result;
    } catch (error) {
      throw error; 
    }
  }

  static async create(data) {
    try {
      const {createdBy, title, participants } = data;
      const conversation = await Conversations.create({
        createdBy,
        title
      });
      console.log(conversation)
      const conversationId = conversation.id;
      const conversationParticipants = participants.map((userId) =>  {
        return {conversationId, userId}
      });
      console.log(conversationParticipants);
      conversationParticipants.forEach(async participant => await Participants.create(participant));
      // Necesito agregar a los participantes a esa conversación
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ConversationsServices;