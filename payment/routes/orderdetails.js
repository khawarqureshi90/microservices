const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {orderdetail} = require('../models/orderSchema')

router.post('/', async(req, res) =>{

    //POST order detail
    let order = new orderdetail({
        customerid: req.body.cus_id,
        orderid: req.body.uniqueid,
        datetime: req.body.date_time,
        price: req.body.orderPrice,
        email: req.body.email
    })

    order = await order.save();
    res.send(order)
});

router.get('/get/:id', async(req, res) => {
    debugger;
    const datata = req.params;
    const orders = await orderdetail.find({customerid: req.params.id});
    res.send(orders);
})

router.get('/allorders',async (req, res)=>{
    const allorders = await orderdetail.find();
    res.send(allorders)
})

module.exports = router;