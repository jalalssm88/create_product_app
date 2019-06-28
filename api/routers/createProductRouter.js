const express = require('express');
const router = express.Router();
const CreateProduct = require('../models/createProductModel');

router.post('/create', (req, res, next)=>{
    console.log('data', req.body.product_name)
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