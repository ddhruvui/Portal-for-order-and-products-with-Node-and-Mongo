const express = require('express')
const router = express.Router()
const checkAuth = require('../middlewear/check-auth')

const ProductsController = require('../controllers/products.js')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname) 
    }
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        // false is for condition when file does not meet requirement
        // replace null with error message
        cb(null, false)
    }
}

const upload = multer({
    storage : storage, 
    limits:{
    fileSize: 1024 * 1024 *10
    },
    fileFilter: fileFilter
})

router.get('/', ProductsController.products_get_all)

router.post('/', checkAuth, upload.single('productImage') , ProductsController.products_add_product )

router.get('/:id', ProductsController.products_get_particular_product )

router.patch('/:id', checkAuth, ProductsController.products_update_product )

router.delete('/:id', checkAuth, ProductsController.products_delete_product )

module.exports = router