const usersModel = require('../models/usersModels.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecretKey = "SecretKey";

const getAllUsers = async (req, res) => {
    const allUsers = await usersModel.find();
    res.send(allUsers)
}

const addUsers = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt);

    const data = {
        user: {
            email: email
        }
    }
    const authToken = jwt.sign(data, jwtSecretKey);

    try {
        await usersModel.create({
            name: name,
            email: email,
            password: secretPassword,
            authToken: authToken
        })
        res.json({
            status: "success"
        })
    }
    catch (err) {
        res.json({
            status: err,
            msg: "Email Exists"
        })
    }
}

const verifyUsers = async (req, res) => {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email });

    try {
        if (!user) {
            res.json({
                status: "false",
                msg: "No Account Found"
            })
        }
        else {
            const chkPass = await bcrypt.compare(password, user.password);
            if (chkPass) {

                res.json({
                    status: "true",
                    users: user,
                    authToken: user.authToken
                })
            }
            else {
                res.json({
                    status: "false",
                    msg: "Invalid Credentials"
                })
            }
        }
    }
    catch (err) {
        req.json({
            error: err
        })
    }
}

const addToCart = async (req, res) => {
    const { elemId, authToken } = req.body;
    const user = await usersModel.findOne({ authToken });
    try {
        if (!user) {
            res.json({
                status: "false",
                msg: "No Account Found"
            })
        }
        else {
            user.cartItems.push(elemId);
            await usersModel.findOneAndUpdate({ authToken }, user)
            res.json({
                status: "true",
                cart: user.cart
            })
        }
    }
    catch (err) {
        req.json({
            error: err
        })
    }

}

const getCartItems = async (req, res) => {
    const { authToken } = req.body;
    const user = await usersModel.findOne({ authToken });

    try {
        if (!user) {
            res.json({
                status: "false",
                msg: "No Account Found"
            })
        }
        else {
            const items = [];
            const cartItems = user.cartItems;

            cartItems.forEach(async (id) => {
                const res = await fetch(`http://localhost:1400/products?_id=${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then((data) => data.json()).then(r => { items.push(r.data.product[0]) })
                    .catch(err => console.log(err))
            });
            setTimeout(() => {
                res.json({
                    status: "true",
                    cartItems: items
                })
            }, 500)
        }
    }
    catch (err) {
        req.json({
            error: err
        })
    }
}

const deleteCartItems = async (req, res) => {
    const { authToken, id } = req.body;
    const user = await usersModel.findOne({ authToken });

    try {

        const index = user.cartItems.indexOf(id)
        await user.cartItems.splice(index, 1)
        await usersModel.findOneAndUpdate({ authToken }, user)
        res.json({
            status: "success"
        })

    }
    catch (err) {
        res.json({
            error: err
        })
    }
}

module.exports = {
    getAllUsers,
    addUsers,
    verifyUsers,
    addToCart,
    getCartItems,
    deleteCartItems
}