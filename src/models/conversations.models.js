const db = require('../utils/database');
const {DataTypes} = require('sequelize');

/**
 * @openapi
 * components:
 *    schemas:
 *      conversations:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            example: 1
 *          title:
 *            type: string
 *            example: Con el compa
 *          imageUrl:
 *            type: string
 *            example: null
 *          type:
 *            type: string
 *            example: single or group
 *          createdBy: 
 *            type: integer
 *            example: 1
 *          messages:
 *            type: array
 *            items:
 */

const Conversations = db.define('conversations', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  imageUrl:{
    type: DataTypes.STRING,
    field: "image_url"
  },
  type:{
    type: DataTypes.ENUM("single", "group"),
    defaultValue: "single"
  },
  createdBy:{
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "created_by"
  }
})

module.exports = Conversations;