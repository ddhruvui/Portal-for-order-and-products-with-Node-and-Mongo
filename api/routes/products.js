const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling get request to /products'
    })
})

router.post('/',(req, res, next)=>{
    const product = {
        name : req.body.name,
        price : req.body.price
    }
    res.status(200).json({
        message: 'Handling post request to /products',
        product: product
    })
})

router.get('/:id', (req, res, next)=>{
    const responseId = req.params
    res.status(200).json({
        message: `Handling get request to /products/${responseId.id}`
    })
})

router.patch('/:id', (req, res, next)=>{
    const responseId = req.params
    res.status(200).json({
        message: `Handling patch request to /products/${responseId.id}`
    })
})

router.delete('/:id', (req, res, next)=>{
    const responseId = req.params
    res.status(200).json({
        message: `Handling delete request to /products/${responseId.id}`
    })
})

module.exports = router