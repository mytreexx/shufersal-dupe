const express = require('express');
const router = express.Router();
const { Customer, Product, ShoppingCart, Order } = require('../models');


//get general store details 
router.get('/', async (req, res) => {
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

module.exports = router;
