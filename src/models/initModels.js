// Utilizando barrels
const {Users, Conversations, Messages, Participants} = require('./index');

const initModels = () => {

  // muchos a muchos --> usuarios y conversaciones

  Users.belongsToMany(Conversations, {through: 'participants'});
  Conversations.belongsToMany(Users, {through: 'participants'});

  // Users.belongsToMany(Conversations, {through: Messages});   
  // Conversations.belongsToMany(Users, {through: Messages});

  Messages.belongsTo(Users, {as: 'sender', foreignKey: "sender_id"});
  Users.hasMany(Messages, {as: 'messages', foreignKey: "sender_id"});

  Messages.belongsTo(Conversations, {as: 'chat', foreignKey: "conversation_id"});
  Conversations.hasMany(Messages, {as: 'messages', foreignKey: "conversation_id"});

  Conversations.belongsTo(Users, {as: 'owner', foreignKey: 'created_by'});
  Users.hasMany(Conversations, {as: 'chats', foreignKey: 'created_by'});
 
}

module.exports = initModels;