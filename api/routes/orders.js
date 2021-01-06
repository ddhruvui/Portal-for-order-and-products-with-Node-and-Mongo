const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling get request to /orders'
    })
})

router.post('/',(req, res, next)=>{
    res.status(200).json({
        message: 'Handling post request to /orders'
    })
})

router.get('/:id', (req, res, next)=>{
    const responseId = req.params.id 
    res.status(200).json({
        message: `Handling get request to /orders/${responseId}`
    })
})

router.delete('/:id', (req, res, next)=>{
    const responseId = req.params
    res.status(200).json({
        message: `Handling delete request to /orders/${responseId.id}`
    })
})

module.exports = router