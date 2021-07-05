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

//add product to cart
app.post('/products', async (req, res) => {
    const { productName, categoryId, price, image, brand } = req.body;

    try {
        const product = await Product.create({
            product_name: productName,
            category_id: categoryId,
            price,
            image,
            brand
        });
        res.send(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
})

//remove product from cart

//update quantity of product in cart

//show cart

//empty cart

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


app.listen(1337, () => {
    console.log('the server is listening on port 1337')
})
