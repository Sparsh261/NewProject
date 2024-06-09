const express = require('express')
const usersController = require('../controllers/usersController.js')

const usersRouter = express.Router();

usersRouter.route('/')
.get(usersController.getAllUsers)

usersRouter.route('/signup')
.post(usersController.addUsers)

usersRouter.route('/login')
.post(usersController.verifyUsers)

usersRouter.route('/addToCart')
.post(usersController.addToCart)


usersRouter.route('/getCartItems')
.post(usersController.getCartItems)

usersRouter.route('/deleteCartItems')
.delete(usersController.deleteCartItems)

module.exports = usersRouter