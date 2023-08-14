const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength:50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength:255
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength:1024
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
});
const UsersItems = mongoose.model('registration', userSchema);

function validateItems(data) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }); 
    return schema.validate(data);
}

exports.UsersItems = UsersItems;
exports.validateItems = validateItems;