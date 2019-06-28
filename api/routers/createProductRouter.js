const express = require('express');
const router = express.Router();
var multer = require('multer')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
   
var upload = multer({ storage: storage })

const CreateProduct = require('../models/createProductModel');



router.post('/create', upload.single('product_image'), (req, res, next)=>{
    console.log('data', req.body.product_image)
    console.log('data', req.body.file)


    const newProduct = new CreateProduct(
        req.body
    )
    newProduct.save()
    .then(product => {
        res.status(201).json({
            message: 'product successfully save to database',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});


router.get('/list_view', (req, res, next)=>{
    CreateProduct.find()
    .select('_id product_name product_barcode product_price product_image')
    .exec()
    .then(docs=>{
        const response = {
            count:docs.length,
            products:docs.map(doc =>{
                return {
                    _id:doc._id,
                    product_name:doc.product_name,
                    product_barcode:doc.product_barcode,
                    product_price:doc.product_price,
                    product_image:doc.product_image,
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});


module.exports = router;