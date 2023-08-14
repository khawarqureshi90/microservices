const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const LoginItems = mongoose.model('LoginItems', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength:30
    },
    email:{
        type: String,
        required: true,
        minlength:10,
        maxlength:60
    },
    password:{
        type: Number,
        required: true,
    }
}));
//GET
router.get('/', async(req, res) => {
    const customers = await LoginItems.find().sort('name');
    res.send(customers);
});
//POST
router.post('/', async(req, res) => {
    const {error} = validateItems(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new LoginItems({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    customer = await customer.save();
    res.send(customer);
});
//UPDATE
router.put('/:id', async(req, res) => {
    const {error} = validateItems(req.body);
    if (!error) return res.status(400).send("error.details[0].message");

    const customer = await LoginItems.findByIdAndUpdate(req.params.id,
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        },{new:true});
    
    if (!customer) return res.status(400).send("error.details[0].message");
    res.send(customer);
});
//DELETE
router.delete('/:id', async(req, res) => {
    const customer = await LoginItems.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(400).send("The item is not available");
    res.send(customer);
});

function validateItems(data) {
        const schema = Joi.object({
            name: Joi.string().min(5).max(30).required(),
            email: Joi.string().min(10).max(60).required(),
            password: Joi.number().required()
        }); 
        return schema.validate(data);
}

module.exports = router;

