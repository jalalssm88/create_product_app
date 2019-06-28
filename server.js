const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb+srv://jalal:jalal4488@mongo-learn-q9bs4.mongodb.net/test?retryWrites=true', {useNewUrlParser: true}, ()=>{
    console.log(`connected to mongo db`);
});

const Create_product = require('./api/routers/createProductRouter');

app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

app.use('/products', Create_product)

app.use((req, res, next)=> {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})
app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})

const port = 5000;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});