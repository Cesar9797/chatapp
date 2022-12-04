const db = require('../utils/database');
const  {Messages} = require('../models');
const initModels = require('../models/initModels');

initModels();

const moreMessages = [];

const messages = [
  {senderId: 1, conversationId: 2, message: 'No puedo, ando con express y sequelize'},
]

for (let i=0; i<100; i++) {
  moreMessages.push({
    senderId: 1, conversationId: 2, message: `Mensaje número ${i}`
  })
}

db.sync()
  .then(
    moreMessages.forEach(async message => await Messages.create(message))
  )