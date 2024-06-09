const productModel = require('../models/productsModel.js');

const getAllProducts = async (req, res) => {
    const { sort = 'price', page = 1, pageSize = 100, fields = "-info", ...q } = req.query;
    try {
        let query = productModel.find();
        let title = q.title;
        let _id = q._id;
        if (title) {
            query = productModel.find({ title: { "$regex": q.title } });
        }
        if(_id){
            query = productModel.find({ _id: _id });
        }

        query = query.sort(sort.split(',').join(' '));

        const skip = pageSize * (page - 1);
        const limit = pageSize;
        query = query.skip(skip).limit(limit);

        query = query.select(fields.split(',').join(' '));

        const data = await query.populate({ path: "review", model: "Reviews" })
            .then((result) => { return result }).catch((err) => console.log(err));

        const totalResults = await productModel.countDocuments()

        res.send({
            status: "success",
            results: data.length,
            totalResults: totalResults,
            pageSize: pageSize,
            page: page,
            data: {
                product: data
            }
        })
    }
    catch (err) {
        console.log(err);
        res.send({
            status: "fail",
            data: {
                error: err
            }
        })
    }
}

const addProducts = async (req, res) => {

    try {
        const { _id, ...reqBody } = req.body
        const data = await productModel.create(reqBody)
        res.json({
            status: "success",
            results: 1,
            ans: {
                products: data
            }
        })
    }
    catch (err) {
        res.status(403);
        res.json({
            status: "fail",
            message: err.message
        })
    }
}

const replaceProduct = async (req, res) => {
    try {
        const reqId = req.params.id;
        const data = { ...req.body };
        const ans = await productModel.findOneAndReplace({ _id: reqId }, data);

        res.json({
            status: "success",
            results: 1,
            message: "Changed"
        })
    }
    catch (err) {
        res.json({
            status: "failes",
            message: err
        })
    }
}

const updateProducts = async (req, res) => {
    try {
        const { _id, ...data } = req.body
        const ans = await productModel.findOneAndUpdate({ _id: req.params.id }, data);
        res.json({
            status: "success",
            results: 1,
            message: ans
        })
    }
    catch (err) {
        res.json({
            status: "failed",
            results: 1,
            message: err
        })
    }
}

const deleteProducts = async (req, res) => {

    try {
        const ans = await productModel.deleteMany(
            { "title": req.params.title } || { "price": req.params.id, "title": req.params.title });
        res.json({
            status: "success",
            results: 1,
            message: ans
        })
    }
    catch (err) {
        res.json({
            status: "failed",
            results: 1,
            message: err
        })
    }
}



module.exports = {
    getAllProducts,
    addProducts,
    replaceProduct,
    updateProducts,
    deleteProducts
}