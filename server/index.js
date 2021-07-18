const express = require('express');
const cors = require('cors');
const path = require('path');

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

app.use('/api', authRoute)
app.use('/api/order', orderRoute)
app.use('/api/product', productRoute)
app.use('/api/details', detailsRoute)
app.use('/api/cart', cartRoute)

const clientPath = path.join(__dirname, '../', 'client', 'build');

app.use(express.static(clientPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`the server is listening on port ${port}`);
})
