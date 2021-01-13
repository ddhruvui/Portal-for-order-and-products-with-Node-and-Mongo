const express = require('express')

const app = express();

const mongoose = require('mongoose')

// package for logging in node
const morgan = require('morgan')

const bodyParser = require('body-parser')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/users')

mongoose.connect('mongodb+srv://dhruv7393:node-rest-shop@cluster0.mxzmx.mongodb.net/node-rest-shop?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//This makes the upload folder public
// Without /uploads in start the way to access image is - http://localhost:3000/2021-01-11T15:38:16.367Zsample-jpg-file-for-testing.jpg
app.use('/uploads',express.static('uploads'))

app.use('/products', productRoutes)

app.use('/orders', orderRoutes)

app.use('/user', userRoutes)

app.get('/',(req, res, next)=>{
    res.status(200).json({
        message : 'It Works 1'
    })
})

app.use((req, res, next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error,req,res, next)=>{
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
})



module.exports = app