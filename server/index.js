const express = require('express');
const cors = require('cors');
const app = express();
const { Op, sequelize, Client, Task } = require('./models');


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
    const registeredIdNumber = await User.findOne({ where: { id: idNumber } });

    if (!idNumber || !email || !password || !confirmPassword) {
        res.send({ error: 'כל השדות הינם שדות חובה' })
    } else if (!validateEmail(email)) {
        res.send({ error: 'כתובת אימייל אינה תקינה' })
    } else if (registeredIdNumber) {
        res.send({ error: 'תעודת זהות קיימת במערכת' })
    } else if (password && password.length < 6) {
        res.send('אורך סיסמה צריך להיות לפחות שישה תווים')
    } else if (password !== confirmPassword) {
        res.send('סיסמאות לא תואמות')
    } else {
        res.send()
    }
})

//register step 2

//login

//get general store details 

//get all products by category

//search for product

//add product to cart

//remove product from cart

//update quantity of product in cart

//show cart

//empty cart

//add order details

//get order details

//make order

//admin: add new products

//admin: edit products

app.listen(1337, () => {
    console.log('the server is listening on port 1337')
})
