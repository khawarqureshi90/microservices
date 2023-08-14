const mongoose = require('mongoose')

const orderschema = new mongoose.Schema({
    customerid:{
        type: String,
    },
    orderid:{
        type: String,
    },

    price:{
        type: String,
    },

    datetime:{
        type: Date,
    },

    email:{
        type: String
    }
});

const orderdetail = mongoose.model('orderdetail', orderschema);

exports.orderdetail = orderdetail;