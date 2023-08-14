const mongoose = require('mongoose');
const cat = require('./routes/catalogue');
const registerusers = require('./routes/registerusers');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const express = require('express');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/catalogue',{
    useNewUrlParser:true, 
    useUnifiedTopology:true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/items', cat);
app.use('/api/register',registerusers);
app.use('/api/auth', auth);
app.use('/api/addproduct', admin);

// app.use('/',(req, res, next)=>{
//     return res.status(200).json({"msg": "hello from customer"})
// })



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));