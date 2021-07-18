const express = require('express');
const cors = require('cors');
const app = express();

const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');
const detailsRoute = require('./routes/details');
const cartRoute = require('./routes/cart');

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    limit: '100mb'
}));

app.use(authRoute)
app.use('/order', orderRoute)
app.use('/product', productRoute)
app.use('/details', detailsRoute)
app.use('/cart', cartRoute)

app.listen(1337, () => {
    console.log('the server is listening on port 1337')
})
