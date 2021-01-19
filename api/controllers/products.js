const Product = require('../models/products')
const mongoose = require('mongoose')

exports.products_add_product = (req, res, next)=>{
    console.log(req.file)
    /*
    const product = {
        name : req.body.name,
        price : req.body.price
    }
    */
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage: req.file.path
    })

    product.save()
    .then(result =>{
        res.status(200).json({
            message: 'Handling post request to /products',
            product: product
        })
    })
    .catch(err => res.status(500).json({ error: err }) )
    /*
    res.status(200).json({
        message: 'Handling post request to /products',
        product: product
    })
    */
}

exports.products_get_all = (req, res, next)=>{
    /*
    res.status(200).json({
        message: 'Handling get request to /products'
    })
    */

    Product.find().select('name price _id productImage')
    .exec()
    .then(doc => res.status(200).json({doc}))
    .catch(error => res.status(500).json(error))
}

exports.products_get_particular_product = (req, res, next)=>{
    const responseId = req.params
    /*
    res.status(200).json({
        message: `Handling get request to /products/${responseId.id}`
    })
    */
    Product.findById(responseId.id)
    .exec()
    .then( doc => {
        if (doc) {
            res.status(200).json(doc)
        }else{
            res.status(404).json({message : "The requested data could not be found"})
        }
        
    })
    .catch(error => res.status(500).json(error => error) );
}

exports.products_update_product = (req, res, next)=>{
    const responseId = req.params
    const dataToBeUpdated = req.body
    Product.update({_id : responseId.id}, {$set : dataToBeUpdated})
    .exec()
    .then(doc => res.status(200).json(doc))
    .catch( error => res.status(500).json(error => error))
    /*
    res.status(200).json({
        message: `Handling patch request to /products/${responseId}`
    })
    */
}

exports.products_delete_product = (req, res, next)=>{
    const responseId = req.params
    Product.findByIdAndDelete(responseId.id)
    .exec()
    .then(doc => {
        res.status(200).json({
            message: `Handling delete request to /products/${responseId.id}`
        })
    })
    .catch( error => res.status(500).json(error => error))
    /*
    res.status(200).json({
        message: `Handling delete request to /products/${responseId.id}`
    })
    */
}