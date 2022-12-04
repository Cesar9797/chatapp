const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  // header authorization --> por aqui mandamos el token
  // Bearer jahsdkjaewkadscnakdsjfnadkjfnaskdj

  const bearerToken = req.headers.authorization;
  if(bearerToken){
    const token = bearerToken.split("Bearer ")[1]
    try {
      const decoded = jwt.verify(token, process.env.SECRET, "HS512");
      req.id_user = decoded;
      next();
    } catch (error) {
      next({
        status: 400,
        message: 'Invalid token',
        errorContent: error
      })
    }
  } else {
    res.json({message: 'No existe token'})
  }
}

module.exports = authenticate;
