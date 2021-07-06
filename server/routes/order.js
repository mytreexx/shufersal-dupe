const express = require('express');
const router = express.Router();
const { sequelize, Customer, Product, ShoppingCart, CartItem, Order } = require('../models');


//show order items + customer details
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
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

module.exports = router;
