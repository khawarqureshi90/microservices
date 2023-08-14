const cors = require('cors')
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors())
const refunddetails = require('./routes/refunddetails')


mongoose.connect('mongodb://127.0.0.1:27017/rollback', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/api/cancelorders', refunddetails)


const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Payment Listening on port ${port}...`)
});