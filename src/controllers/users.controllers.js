const {UserServices} = require('../services')
const transporter = require('../utils/nodemailer')
const welcomeTemplate = require('../templates/generateTemplate');

const userRegister = async (req, res, next) => {
  try {
    const newUser = req.body;
    const result = await UserServices.create(newUser);
    res.status(201).json(result);
    // en este punto sabemos que el usuario se registro correctamente
    // es aqui donde tengo que enviar un correo electrónico 
    transporter.sendMail({
      from: "<cesar.lararaya@gmail.com>",
      to: result.email,
      subject: "Bienvenido a chatapp",
      text: `Hola ${result.firstname} bienvenido a la mejor aplicación de mensajería`,
      html: welcomeTemplate()
    });
  } catch (error) {
    next({
      message: 'Algo salió mal al crear el usuario',
      status: 400,
      errorContent: error
    })
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    // offset -> desde que elemento iniciamos a buscar
    // limit -> cantidad de registros a traer
    const {id_user} = req;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 5;
    const result = await UserServices.getAll(offset, limit);
    res.json(result);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: 'Algo salió mal en la petición'
    })
  }
}

module.exports = {
  userRegister,
  getAllUsers
}