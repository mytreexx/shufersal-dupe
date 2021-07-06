const express = require('express');
const cors = require('cors');
const app = express();
const { Op, sequelize, Customer, Category, Product, ShoppingCart, CartItem, Order } = require('./models');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product')


app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(authRoute)
app.use('/order', orderRoute)
app.use('/product', productRoute)

//get general store details 
app.get('/details', async (req, res) => {
    const { customerId } = req.body;

    const products = await Product.findAll();
    const orders = await Order.findAll();

    if (customerId) {
        const customer = await Customer.findOne({ where: { id: customerId } });
        let messageToUser;

        const cart = await ShoppingCart.findOne({
            where: { customer_id: customerId },
            order: [['id', 'DESC']],
        });

        if (cart) {
            const order = await Order.findOne({ where: { cart_id: cart.id } })
            if (order) {
                messageToUser = `ההזמנה האחרונה שלך בוצעה בתאריך ${order.order_date}`;
            } else {
                messageToUser = `קיימת עגלת קניות מהתאריך ${cart.created_at}`;
            }
        } else {
            messageToUser = `ברוכים הבאים ${customer.first_name}`;
        }
        res.send({
            numberOfProducts: products.length,
            numberOfOrders: orders.length,
            messageToUser
        })
    } else {
        res.send({
            numberOfProducts: products.length,
            numberOfOrders: orders.length,
        })
    }

})

//check if there is an active cart and show items
app.get('/cart', async (req, res) => {
    const { customerId } = req.body;

    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "-");

    const createNewCart = async () => {
        try {
            await sequelize.sync();
            await ShoppingCart.create({
                customer_id: customerId,
                created_at: formattedDate
            });
            res.send({ message: 'created new cart!' });
        } catch (e) {
            console.error(e)
            res.send(e)
        }
    }

    const cart = await ShoppingCart.findOne({
        where: { customer_id: customerId },
        order: [['id', 'DESC']],
    });

    if (cart) {
        const order = await Order.findOne({ where: { cart_id: cart.id } })
        if (order) {
            createNewCart();
        } else {
            const cartItems = await CartItem.findAll({ where: { cart_id: cart.id }, include: { model: Product } })
            res.send(cartItems)
        }
    } else {
        createNewCart();
    }
})

//add product to cart
app.post('/item', async (req, res) => {
    const { customerId, productId, quantity } = req.body;

    const currentCart = await ShoppingCart.findOne({
        where: { customer_id: customerId },
        order: [['id', 'DESC']],
    });

    const product = await Product.findOne({ where: { id: productId } })

    try {
        await sequelize.sync();
        await CartItem.create({
            product_id: productId,
            cart_id: currentCart.id,
            quantity,
            total_price: product.price * quantity
        });
        res.send({ totalPrice: product.price * quantity });
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

//remove product from cart
app.delete('/item', async (req, res) => {
    const { customerId, productId } = req.body;

    const currentCart = await ShoppingCart.findOne({
        where: { customer_id: customerId },
        order: [['id', 'DESC']],
    });

    try {
        await sequelize.sync();
        CartItem.destroy({
            where: {
                [Op.and]: [
                    { product_id: productId },
                    { cart_id: currentCart.id }
                ]
            }
        });
        res.send({ message: `removed item ${productId} from cart ${currentCart.id}` });
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

//update quantity of an item in cart
app.patch('/item', async (req, res) => {
    const { customerId, productId, newQuantity } = req.body;

    const product = await Product.findOne({ where: { id: productId } })

    const currentCart = await ShoppingCart.findOne({
        where: { customer_id: customerId },
        order: [['id', 'DESC']],
    });

    const itemToUpdate = await CartItem.findOne({
        where: {
            [Op.and]: [
                { product_id: productId },
                { cart_id: currentCart.id }
            ]
        }
    });

    itemToUpdate.quantity = newQuantity;
    itemToUpdate.total_price = (newQuantity * product.price);

    try {
        await sequelize.sync();
        itemToUpdate.save();
        res.send(itemToUpdate);
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

//empty cart
app.delete('/cart', async (req, res) => {
    const { customerId } = req.body;

    const currentCart = await ShoppingCart.findOne({
        where: { customer_id: customerId },
        order: [['id', 'DESC']],
    });

    try {
        await sequelize.sync();
        CartItem.destroy({ where: { cart_id: currentCart.id } });
        res.send({ message: `cart ${currentCart.id} is now empty` });
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

app.listen(1337, () => {
    console.log('the server is listening on port 1337')
})
