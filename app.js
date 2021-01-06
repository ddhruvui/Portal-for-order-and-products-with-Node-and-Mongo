const express = require('express')

const app = express();

// package for logging in node
const morgan = require('morgan')

const bodyParser = require('body-parser')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use((req, res, body)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Header','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE')
        return res.status(200).json({})
    }
    next();
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/products', productRoutes)

app.use('/orders', orderRoutes)

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