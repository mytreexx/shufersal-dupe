const express = require('express');
const router = express.Router();
const { sequelize, Customer, Product, ShoppingCart, CartItem, Order } = require('../models');
const jwt = require('jsonwebtoken');
const verifyTokenOrError = require('../utils/middlewares/JWT/verifyTokenOrError');


//show order items + customer details
router.get('/', verifyTokenOrError, (req, res) => {
    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const availableDates = [];

            for (let i = 1; i < 8; i++) {
                const date = new Date();
                let weekDate = new Date();
                weekDate.setDate(date.getDate() + i)
                const formattedDate = weekDate.toISOString().slice(0, 10).replace(/-/g, "-");

                const numberOfOrdersToDate = await Order.findAndCountAll({ where: { shipping_date: formattedDate } });

                if (numberOfOrdersToDate.count <= 3) {
                    availableDates.push(formattedDate)
                }
            }

            const customer = await Customer.findOne({ where: { id: authData.loggingInUser.id } });
            const currentCart = await ShoppingCart.findOne({
                where: { customer_id: authData.loggingInUser.id },
                order: [['id', 'DESC']],
            });

            const cartItems = await CartItem.findAll({ where: { cart_id: currentCart.id }, include: { model: Product } })
            res.send({ cartItems, customer, availableDates })
        }
    });
})

// create order
router.post('/', verifyTokenOrError, (req, res) => {
    const { city, street, shippingDate, creditCard } = req.body;

    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const currentCart = await ShoppingCart.findOne({
                where: { customer_id: authData.loggingInUser.id },
                order: [['id', 'DESC']],
            });

            const cartItems = await CartItem.findAll({ where: { cart_id: currentCart.id } })
            let totalPrice = 0;
            cartItems.forEach(item => totalPrice = totalPrice + item.total_price)

            const date = new Date();
            const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "-");

            try {
                await sequelize.sync();
                const newOrder = await Order.create({
                    customer_id: authData.loggingInUser.id,
                    cart_id: currentCart.id,
                    total_price: totalPrice,
                    city,
                    street,
                    shipping_date: shippingDate,
                    order_date: formattedDate,
                    credit_card_last_digits: creditCard
                });
                res.send({
                    orderId: newOrder.id,
                    shippingDate: shippingDate
                });
            } catch (e) {
                console.error(e)
                res.send(e)
            }
        }
    });
})

module.exports = router;
