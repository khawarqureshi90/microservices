const {UsersItems} = require('../models/registeruser')
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//POST
router.post('/', async(req, res) => {
    const {error} = validateItems(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await UsersItems.findOne({email: req.body.email});
    if(!customer) return res.status(400).send('Invalid Email and Password');
    
    const validPassword = await bcrypt.compare(req.body.password, customer.password);
    if(!validPassword) return res.status(400).send('Invalid Email and Password');

    res.json({
        token:generateToken(customer._id),
        isAdmin: customer.isAdmin,
        customerid: customer._id,
        email: customer.email
    });
});

function validateItems(req) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }); 
    return schema.validate(req);
}

const JWT = "abc123";  // Sort out .ENV file
const generateToken = (id) =>{
    return jwt.sign({id}, JWT, {expiresIn:'30d'})
}

module.exports = router;