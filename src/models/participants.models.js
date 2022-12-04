const db = require('../utils/database');
const {DataTypes} = require('sequelize');

const Participants =  db.define('participants', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id"
  },
  conversationId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "conversation_id"
  }
})

module.exports = Participants;