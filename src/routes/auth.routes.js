const {Router} = require('express');
const router = Router();
const {userLogin} = require('../controllers/index')

router.post('/auth/login', userLogin);

module.exports = router;