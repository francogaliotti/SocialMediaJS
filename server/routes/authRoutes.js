const express = require('express');
const routes = express.Router();
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')

routes.post('/register', authController.register)
routes.post('/login', authController.login)
routes.get('/', auth, authController.validateToken)
routes.get('/info/:id', auth, authController.getUser)
routes.put('/changepassword', auth, authController.changePassword)



module.exports = routes