const Order = require('../models/orders')
const Product = require('../models/products')
const mongoose = require('mongoose')

exports.orders_get_all = (req, res, next)=>{
    /*
    res.status(200).json({
        message: 'Handling get request to /orders'
    })
    */
   Order.find()
   .populate('product', 'name')
   .exec()
   .then( orders => res.status(200).json({orders}) )
   .catch( error => res.status(404).json({error}))
}

exports.orders_create_order = (req, res, next)=>{
    /*
    res.status(200).json({
        message: 'Handling post request to /orders'
    })
    */

    Product.findById(req.body.product)
    .exec()
    .then(product =>{
        if (!product){
            return res.status(404).json({message : "Product not found"})
        }else{
            const order = new Order({
                _id : mongoose.Types.ObjectId(),
                product: req.body.product,
                quantity: req.body.quantity
            })
            order.save()
           .then( orders => res.status(200).json({orders}) )
           .catch( error => res.status(404).json({error}))
        }
    })
    .catch( error => res.status(404).json({error}))

    
}

exports.orders_get_particular_order = (req, res, next)=>{
    const responseId = req.params.id 
    /*
    res.status(200).json({
        message: `Handling get request to /orders/${responseId}`
    })
    */
    Order.findById(responseId)
    .exec()
    .then( orders => res.status(200).json({orders}) )
    .catch( error => res.status(404).json({error}))
}

exports.orders_delete_order = (req, res, next)=>{
    const responseId = req.params
    /*
    res.status(200).json({
        message: `Handling delete request to /orders/${responseId.id}`
    })
    */
    Order.findByIdAndDelete(responseId.id)
    .exec()
    .then( orders => res.status(200).json({orders}) )
    .catch( error => res.status(404).json({error}))
}