const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/payment', proxy('http://localhost:5001'))             //payment
app.use('/', proxy('http://localhost:5000'))            //customer



const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Payment Listening on port ${port}...`)
});