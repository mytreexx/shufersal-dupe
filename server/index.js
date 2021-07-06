const express = require('express');
const cors = require('cors');
const app = express();
const { Op, sequelize, Customer, Category, Product, ShoppingCart, CartItem, Order } = require('./models');


app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


//register step 1
app.post('/registration-check', async (req, res) => {
    const { idNumber, email, password, confirmPassword } = req.body;

    let registeredIdNumber;

    if (idNumber) {
        registeredIdNumber = await Customer.findOne({ where: { id: idNumber } })
    }

    if (!idNumber || !email || !password || !confirmPassword) {
        res.send({ error: 'נא למלא את כל השדות' })
    } else if (!validateEmail(email)) {
        res.send({ error: 'כתובת אימייל אינה תקינה' })
    } else if (registeredIdNumber) {
        res.send({ error: 'תעודת זהות קיימת במערכת' })
    } else if (password && password.length < 6) {
        res.send({ error: 'אורך סיסמה צריך להיות לפחות שישה תווים' })
    } else if (password !== confirmPassword) {
        res.send({ error: 'סיסמאות לא תואמות' })
    } else {
        res.send()
    }
})

//register step 2
app.post('/register', async (req, res) => {
    const { idNumber, email, password, firstName, lastName, city, street } = req.body;
    if (!firstName || !lastName || !city || !street) {
        res.send({ error: 'נא למלא את כל השדות' })
    } else {
        try {
            await sequelize.sync();
            await Customer.create({
                id: idNumber,
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                city,
                street
            });
            res.send();
        } catch (e) {
            console.error(e)
            res.send(e)
        }
    }
})

//login
app.post('/login', async (req, res) => {
    const { idNumber, password } = req.body;

    const loggingInUser = await Customer.findOne({ where: { id: idNumber } });
    console.log(loggingInUser)

    if (!loggingInUser) {
        res.send({ error: 'משתמש לא נמצא' })
    } else if (loggingInUser.password !== password) {
        res.send({ error: 'סיסמה לא נכונה' })
    } else {
        res.send({ userId: loggingInUser.id });
    }
})

//get general store details 

// get number of products
// get number of complete orderd
// get customer latest order status


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
            const cartItems = await CartItem.findAll({ where: { cart_id: cart.id } })
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
        res.send({ totalPrice: total_price });
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

//add order details

//get order details

//make order

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
