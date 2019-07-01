const express = require('express');
const router = express.Router();
var multer = require('multer')

//handling file upload using multer
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb)=>{
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null, true);
    }else{
        cb(null, false)
    }
}
const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
});

//import product schema from createProducrModel
const CreateProduct = require('../models/createProductModel');

//handler post request for create product
router.post('/', upload.single('product_image'), (req, res)=>{
    console.log('req body', req.body)
    console.log('req file', req.file.path)
    const newProduct = new CreateProduct({
        product_name:req.body.product_name,
        product_barcode:req.body.product_barcode,
        product_price:req.body.product_price,
        product_image: req.file.path
    })
    newProduct.save()
    .then(product => {
        res.status(201).json({

            status:"success",
            message: 'product successfully save to database',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});


router.get('/', (req, res, next)=>{
    CreateProduct.find()
    .select('_id product_name product_barcode product_price product_image')
    .exec()
    .then(docs=>{
        const response = {
            count:docs.length,
            headers:["Name", "Barcode", "Price", "Image","Delete"],
            data:docs.map(doc =>{
                return {
                    _id:doc._id,
                    product_name: doc.product_name,
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

router.delete('/:id', (req, res)=>{
    product_id = req.params.id;
    console.log('produ id', product_id)
    CreateProduct.remove({_id:product_id})
    .then(product=>{
        res.status(200).json({
            status:"success",
            message: "deleted successfully",
        })
    })
    .catch(err=>{
       res.status(500).json({
           error:err
       })
    })
})


module.exports = router;
