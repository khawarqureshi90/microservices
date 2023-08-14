const mongoose = require('mongoose');
const Joi = require('joi');
const { text } = require('express');
const { Int32 } = require('mongodb');

const userSchema = new mongoose.Schema({
    productname:{
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    description:{
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    price:{
        type: String,
        required: true
    },
    myfile:{
        type: String,
        required: true
    } 
});
const UsersItems = mongoose.model('additem', userSchema);

function validateItems(data) {
    const schema = Joi.object({
        productname: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(5).max(255).required(),
        price: Joi.string().required(),
        myfile: Joi.string().required()
    }); 
    return schema.validate(data);
}


exports.validateItems = validateItems;
exports.UsersItems = UsersItems;