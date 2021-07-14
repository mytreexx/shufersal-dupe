const express = require('express');
const router = express.Router();
const { Customer, Product, ShoppingCart, Order } = require('../models');


//get general store details 
router.post('/', async (req, res) => {
    const { customerId } = req.body;

    const products = await Product.findAll();
    const orders = await Order.findAll();

    let messageToUser = "ברוך הבא לשופרסל";
    let hasActiveCart = false;

    if (customerId) {
        const customer = await Customer.findOne({ where: { id: customerId } });
        const cart = await ShoppingCart.findOne({
            where: { customer_id: customerId },
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
    }
    else {
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
