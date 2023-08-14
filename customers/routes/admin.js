const {UsersItems, validateItems} = require('../models/adminSchema');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

//GET
router.get('/get', async(req, res) => {
    const itemData = await UsersItems.find();
    res.json(itemData);
});

//POST
router.post('/', async(req, res) => {
    const {error} = validateItems(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const item = new UsersItems(_.pick(req.body, ['productname', 'description', 'price', 'myfile']));

    await item.save();

    res.json({
        _id:item._id,
        productname:item.productname,
        description:item.description,
        price: item.price,
        myfile: item.myfile,
    });
});

//Delete
router.delete('/delete/:id',async(req, res) => {
    debugger;
    res.send(await UsersItems.findByIdAndDelete({_id : req.params.id})).status(200);
})

//UPDATE
router.put('/:id', async(req, res) => {
    // const {error} = validateItems(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    const updateditem = await UsersItems.findByIdAndUpdate({_id : req.params.id},
        {
            productname:req.body.productname,
            description:req.body.description,
            price: req.body.price,
            // myfile: req.body.myfile     IF you want to change pictures as well uncomment
        },{new:true});
    // updateditem.save();
    if (!updateditem) return res.status(400).send("error.details[0].message");
    res.json(updateditem)
})

module.exports = router;