const express = require('express');
const router = express.Router();
const { Op, sequelize, Product, ShoppingCart, CartItem, Order } = require('../models');
const jwt = require('jsonwebtoken');
const verifyTokenOrError = require('../utils/middlewares/JWT/verifyTokenOrError');


//check if there is an active cart and show items
router.get('/', verifyTokenOrError, (req, res) => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "-");

    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const createNewCart = async () => {
                try {
                    await sequelize.sync();
                    await ShoppingCart.create({
                        customer_id: authData.loggingInUser.id,
                        created_at: formattedDate
                    });
                    res.send({ message: 'created new cart!' });
                } catch (e) {
                    console.error(e)
                    res.send(e)
                }
            }

            const cart = await ShoppingCart.findOne({
                where: { customer_id: authData.loggingInUser.id },
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
        }
    });
})

//add product to cart
router.post('/', verifyTokenOrError, (req, res) => {
    const { productId, quantity } = req.body;

    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const currentCart = await ShoppingCart.findOne({
                where: { customer_id: authData.loggingInUser.id },
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
        }
    });
})

//remove product from cart
router.delete('/item', verifyTokenOrError, (req, res) => {
    const { productId } = req.body;

    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const currentCart = await ShoppingCart.findOne({
                where: { customer_id: authData.loggingInUser.id },
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
        }
    });
})

//update quantity of an item in cart
router.patch('/', verifyTokenOrError, (req, res) => {
    const { productId, newQuantity } = req.body;

    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const product = await Product.findOne({ where: { id: productId } })

            const currentCart = await ShoppingCart.findOne({
                where: { customer_id: authData.loggingInUser.id },
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
        }
    });
})

//empty cart
router.delete('/', verifyTokenOrError, (req, res) => {
    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const currentCart = await ShoppingCart.findOne({
                where: { customer_id: authData.loggingInUser.id },
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
        }
    });
})

module.exports = router;
