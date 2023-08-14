const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {refunddetail} = require('../models/refundSchema')
const nodemailer = require("nodemailer")



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'khawarq80@gmail.com',
      pass: 'mcxxuzoudxsybsul'
    }
  });


router.post('/', async(req, res) =>{

    //POST order detail
    let ordercancelled = new refunddetail({
        // const { email, subject, content, price } = req.body
        email: req.body.email,
        subject: req.body.subject,
        content: req.body.message,
        price: req.body.price
    })


    var mailOption = {
        from:"khawarq80@gmail.com",
        to: req.body.email,
        subject:req.body.subject,
        text:req.body.message
    };


    transporter.sendMail(mailOption, function (error, info) {
        if (error){
            console.log(error)
        }
        else{
            console.log("Email send successfully!");
        }
    })
    ordercancelled = await ordercancelled.save();
    res.send(ordercancelled)
});

module.exports = router;