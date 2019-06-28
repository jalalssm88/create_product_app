const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreateProductSchema = new Schema({
    product_name:{
        type:String,
        require:true
    },
    product_barcode:{
        type:Number,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    product_image:{
        type:String
    }
});

module.exports = mongoose.model('create_product', CreateProductSchema);