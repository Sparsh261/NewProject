const reviewsController = require('../controllers/reviewsController.js');
const express = require('express');

const reviewsRouter = express.Router();

reviewsRouter.route('/')
.get(reviewsController.getReviews)
.post(reviewsController.addReviews)

module.exports = reviewsRouter