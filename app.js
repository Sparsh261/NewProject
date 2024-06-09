const express = require('express')
const cors = require('cors')


const productsRouter = require('./routes/productsRoutes.js');
const usersRouter = require('./routes/usersRoutes.js');
const reviewsRouter = require('./routes/reviewsRoutes.js');

const app = express();

app.use(cors({
    origin: '*',
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  allowedHeaders:['Content-Type']
}))

app.use(express.json());
app.use('/products',productsRouter);
app.use('/users',usersRouter);
app.use('/reviews',reviewsRouter);

module.exports = app;