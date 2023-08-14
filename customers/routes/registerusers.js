const {UsersItems, validateItems} = require('../models/registeruser')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config;
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')

//GET
router.get('/me', protect ,async(req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
});
//POST
router.post('/', async(req, res) => {
    const {error} = validateItems(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await UsersItems.findOne({email: req.body.email});
    if(customer) return res.status(400).send('User already registered with this email.');
    
    customer = new UsersItems(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
    await customer.save();
    
    // res.json(_.pick(customer, ['_id', 'name', 'email']));
    res.json({
        _id:customer._id,
        name:customer.name,
        email:customer.email,
        token:generateToken(customer._id)
    });
});
const JWT = "abc123";  // Sort out .ENV file
const generateToken = (id) =>{
    return jwt.sign({id}, JWT, {expiresIn:'30d'})
}

module.exports = router;