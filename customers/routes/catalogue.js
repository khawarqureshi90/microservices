const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Items = mongoose.model('Items', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength:30
    },
    description:{
        type: String,
        required: true,
        minlength:10,
        maxlength:60
    },
    price:{
        type: String,
        required: true,
    }
}));
//GET
router.get('/', async(req, res) => {
    const customers = await Items.find().sort('name');
    res.send(customers);
});
//POST
router.post('/', async(req, res) => {
    const {error} = validateItems(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Items({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price
    });
    customer = await customer.save();
    res.send(customer);
});
//UPDATE
router.put('/:id', async(req, res) => {
    const {error} = validateItems(req.body);
    if (!error) return res.status(400).send("error.details[0].message");

    const customer = await Items.findByIdAndUpdate(req.params.id,
        {
            name:req.body.name,
            description:req.body.description,
            price:req.body.price
        },{new:true});
    
    if (!customer) return res.status(400).send("error.details[0].message");
    res.send(customer);
});
//DELETE
router.delete('/:id', async(req, res) => {
    const customer = await Items.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(400).send("The item is not available");
    res.send(customer);
});

function validateItems(data) {
        const schema = Joi.object({
            name: Joi.string().min(5).max(30).required(),
            description: Joi.string().min(10).max(60).required(),
            price: Joi.number().required()
        }); 
        return schema.validate(data);
}

module.exports = router;

