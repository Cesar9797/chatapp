const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/database');
const handleError = require('./middlewares/error.middleware');
const initModels = require('./models/initModels');  
const {userRoutes, authRoutes, conversationRoutes} = require('./routes')
const transporter = require('./utils/nodemailer');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

initModels();

db.authenticate()
  .then(() => console.log('Auntenticación exitosa'))
  .catch(error => console.log(error));

db.sync({force: false}) 
  .then(() => console.log('Base de datos sincronizada'))
  .catch(error => console.log(error));


transporter.verify().then(() => {
  console.log('Estamos listos para enviar correos')
});

// app.use('/', (req, res) => {
//   console.log('Bienvenidos')
// })

app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', conversationRoutes);

app.use(handleError);

module.exports = app;