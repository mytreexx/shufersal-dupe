const express = require('express');
const router = express.Router();
const { Customer, Product, ShoppingCart, Order } = require('../models');
const jwt = require('jsonwebtoken');
const verifyTokenOrGuest = require('../utils/middlewares/JWT/VerifyTokenOrGuest');


//get general store details 
router.post('/', verifyTokenOrGuest, async (req, res) => {

    const products = await Product.findAll();
    const orders = await Order.findAll();

    let messageToUser = "ברוך הבא לשופרסל";
    let hasActiveCart = false;

    if (!!req.token) {
        jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
            const customer = await Customer.findOne({ where: { id: authData.loggingInUser.id } });
            const cart = await ShoppingCart.findOne({
                where: { customer_id: customer.id },
                order: [['id', 'DESC']],
            });

            if (cart) {
                const order = await Order.findOne({ where: { cart_id: cart.id } })
                if (order) {
                    messageToUser = `העגלה שלך ריקה, הזמנה אחרונה בוצעה ב-${order.order_date}`;
                } else {
                    messageToUser = `מוזמנים להמשיך בתהליך הקניה מ-${cart.created_at}`;
                    hasActiveCart = true;
                }
            }
            res.send({
                numberOfProducts: products.length,
                numberOfOrders: orders.length,
                messageToUser,
                hasActiveCart,
                customerName: customer.first_name
            })
        });
    } else {
        res.send({
            numberOfProducts: products.length,
            numberOfOrders: orders.length,
            messageToUser,
            hasActiveCart,
            customerName: "אורח"
        })
    }
})

module.exports = router;
