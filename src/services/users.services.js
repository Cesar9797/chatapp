const {Users} = require('../models');

class UserServices {
  static async create (user) {
    try {
      const result = await Users.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(offset, limit) {
    try {

      const result = await Users.findAll({ // El offset solo funciona con .finAll y findAndCountAll
        offset,
        limit,
        attributes: ['id', 'firstname', 'lastname', 'email', 'phone', 'createdAt']
      });
      return result
    } catch (error) {
      throw error
    }
  }
}


module.exports = UserServices;