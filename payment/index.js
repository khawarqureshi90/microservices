const cors = require('cors') 
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json());
const orderdetails = require('./routes/orderdetails')
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/checkout',{
    useNewUrlParser:true, 
    useUnifiedTopology:true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


    app.use('/api/orders',orderdetails)

// app.use('/',(req, res, next)=>{
//     return res.status(200).json({"msg": "hello from payment"})
//     console.log("paymentservice called")
// })

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Payment Listening on port ${port}...`)
});