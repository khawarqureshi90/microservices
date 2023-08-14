const mongoose = require('mongoose')

const refundschema = new mongoose.Schema({

    email:{
        type: String
    },

    subject:{
        type: String,
    },

    content:{
        type: String,
    },

    price: {
        type: String,
    }
});

const refunddetail = mongoose.model('refunddetail', refundschema);

exports.refunddetail = refunddetail;