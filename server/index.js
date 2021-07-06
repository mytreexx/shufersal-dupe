const express = require('express');
const cors = require('cors');
const app = express();
const { Op, sequelize, Customer, Category, Product, ShoppingCart, CartItem, Order } = require('./models');
const authRoute = require('./routes/auth');


app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(authRoute)

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

//get all products by category
app.get('/products', async (req, res) => {
    const { categoryId } = req.body;

    const products = await Product.findAll({ where: { category_id: categoryId } });
    res.send(products)
})

//search for product
app.get('/search', async (req, res) => {
    const { searchTerm } = req.body;
    const products = await Product.findAll({ where: { product_name: { [Op.like]: `%${searchTerm}%` } } })

    res.send(products)
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

//show order items + customer details
app.get('/order', async (req, res) => {
    const { customerId } = req.body;

    const customer = await Customer.findOne({ where: { id: customerId } });
    const currentCart = await ShoppingCart.findOne({
        where: { customer_id: customerId },
        order: [['id', 'DESC']],
    });
    const cartItems = await CartItem.findAll({ where: { cart_id: currentCart.id }, include: { model: Product } })

    res.send({ cartItems, customer })
})

// create order
app.post('/order', async (req, res) => {
    const { customerId, city, street, shippingDate, creditCard } = req.body;

    const currentCart = await ShoppingCart.findOne({
        where: { customer_id: customerId },
        order: [['id', 'DESC']],
    });

    const cartItems = await CartItem.findAll({ where: { cart_id: currentCart.id } })
    let totalPrice = 0;
    cartItems.forEach(item => totalPrice = totalPrice + item.total_price)

    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "-");

    try {
        await sequelize.sync();
        await Order.create({
            customer_id: customerId,
            cart_id: currentCart.id,
            total_price: totalPrice,
            city,
            street,
            shipping_date: shippingDate,
            order_date: formattedDate,
            credit_card_last_digits: creditCard
        });
        res.send({ message: `order complete!` });
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

//admin: add new products
app.post('/product', async (req, res) => {
    const { productName, categoryId, price, image, brand } = req.body;
    try {
        await sequelize.sync();
        await Product.create({
            product_name: productName,
            category_id: categoryId,
            price,
            image,
            brand
        });
        res.send();
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})

//admin: edit products
app.patch('/product', async (req, res) => {
    const { productId, productName, categoryId, price, image, brand } = req.body;
    const product = await Product.findOne({ where: { id: productId } });

    productName && (product.product_name = productName);
    categoryId && (product.category_id = categoryId);
    price && (product.price = price);
    image && (product.image = image);
    brand && (product.brand = brand);

    try {
        await product.save();
        res.send(product);
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})


app.listen(1337, () => {
    console.log('the server is listening on port 1337')
})
