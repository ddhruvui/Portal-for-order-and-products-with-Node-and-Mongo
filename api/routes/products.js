const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/products')
const multer = require('multer')
const upload = multer({dest : 'uploads/'})

router.get('/', (req, res, next)=>{
    /*
    res.status(200).json({
        message: 'Handling get request to /products'
    })
    */

    Product.find().select('name price _id')
    .exec()
    .then(doc => res.status(200).json({doc}))
    .catch(error => res.status(500).json(error))
})

router.post('/',upload.single('productImage') ,(req, res, next)=>{
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
        price : req.body.price
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
})

router.get('/:id', (req, res, next)=>{
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
})

router.patch('/:id', (req, res, next)=>{
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
})

router.delete('/:id', (req, res, next)=>{
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
})

module.exports = router