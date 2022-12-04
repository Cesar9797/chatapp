const db = require('../utils/database');
const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt')

/**
 * @openapi
 * components:
 *  schemas:
 *    users:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        firstname: 
 *          type: string
 *          example: Ian
 *        lastname:
 *          type: string
 *          example: Rosas
 *        email: 
 *          type: string
 *          example: ian@gmail.com
 *        phone:
 *          type: string
 *          example: 1231231234
 *        createdAt: 
 *          type: string
 *          example: 2022-11-24T00:50:00.611Z
 *    register:
 *      type: object
 *      properties:
 *        firstname:
 *          type: string
 *          example: Ian
 *        lastname:
 *          type: string
 *          example: Rosas
 *        email:
 *          type: string
 *          example: ian@gmail.com
 *        phone:
 *          type: string
 *          example: 0000000000
 *        password:
 *          type: string
 *          example: 1234
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT    
 *    
 * 
 */

const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profileImage: {
    type: DataTypes.STRING,
    field: 'profile_image'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
},
{
  hooks: {
    beforeCreate: (user, options) => {
      const {password} = user;
      const hash = bcrypt.hashSync(password, 8);
      user.password = hash;
    }
  }
}
)

module.exports = Users;