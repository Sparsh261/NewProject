
const express = require('express')
const productsController = require('../controllers/productsController.js')


const productsRouter = express.Router();


productsRouter.route('/')
.get(productsController.getAllProducts)
.post(productsController.addProducts)

productsRouter.route('/:id')
.put(productsController.replaceProduct)
.patch(productsController.updateProducts)


productsRouter.route('/:title')
.delete(productsController.deleteProducts)

productsRouter.route('/:title/:price')
.delete(productsController.deleteProducts)

module.exports = productsRouter