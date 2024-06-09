
const productModel = require('../models/productsModel.js');
const reviewsModel = require('../models/reviewsModel');
const mongoose = require('mongoose')

const getReviews = async (req, res) => {

    try {
        const data = await reviewsModel.find();
        res.send({
            status: "success1",
            reviews: data
        })
    }
    catch (err) {
        res.send({
            status: "failed2",
            error: err
        })
    }
}

const addReviews = async (req, res) => {

    const { _id, ...reqBody } = req.body
    try {
        if ((await reviewsModel.findOne({ productId: reqBody.productId, userId: reqBody.userId })) != null) {
            res.json({
                message: "Userid for product exist"
            })
            return;
        }
        else {

            const data = await reviewsModel.create(reqBody);
            let objId = new mongoose.Types.ObjectId(data.id)

            const userToUpdate = await productModel.findOne({ _id: reqBody.productId })
            userToUpdate.review.push(objId)
            const updatedData = await productModel.updateOne({ _id: reqBody.productId }, userToUpdate)
            res.send({
                status: "success",
                reviews: data,
                updated: updatedData
            })
        }
    }
    catch (err) {
        res.send({
            status: "failed",
            error: err
        })
    }
}

module.exports = {
    getReviews,
    addReviews
}