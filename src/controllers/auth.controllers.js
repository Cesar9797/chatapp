const {AuthServices} = require('../services/index')

const userLogin = async (req, res, next) => {
  try {
    // email, password
    const credentials = req.body;
    const result = await AuthServices.authenticate(credentials);
    if (result) {
      const {firstname, lastname, email, id, phone} = result.result;
      const user = {firstname, lastname, email, id, phone};
      const token = AuthServices.genToken(user);
      user.token = token;
      res.json({...user});
    } else {
      res.status(400).json({message: 'información invalida'});
    }
  } catch (error) {
    next({
      status: 400,
      message: 'usuario o contrasena invalida',
      errorContent: error
    })
  }
}

module.exports = {userLogin};