const express = require('express');
const router = express.Router();
const { Op, sequelize, Product, ShoppingCart, CartItem, Order } = require('../models');
const jwt = require('jsonwebtoken');
const verifyTokenOrError = require('../utils/middlewares/JWT/verifyTokenOrError');

const getCart = async (customerId) => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "-");

    const createNewCart = async () => {
        try {
            await sequelize.sync();
            const newCart = await ShoppingCart.create({
                customer_id: customerId,
                created_at: formattedDate
            });

            console.log('creating new cart', newCart.id);

            return newCart;
        } catch (e) {
            console.error(e)
            res.send(e)
        }
    }

    let cart = await ShoppingCart.findOne({
        where: { customer_id: customerId },
        order: [['id', 'DESC']],
    });

    if (cart) {
        const order = await Order.findOne({ where: { cart_id: cart.id } })
        
        if (order) {
            cart = await createNewCart();
        }
    } else {
        cart = await createNewCart();
    }

    const cartItems = await CartItem.findAll({ where: { cart_id: cart.id }, include: { model: Product } })
    return cartItems;
}

//check if there is an active cart and show items
router.get('/', verifyTokenOrError, (req, res) => {
    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const cart = await getCart(authData.loggingInUser.id);
            res.send(cart);
        }
    });
})

//add or update items to cart
router.put('/', verifyTokenOrError, (req, res) => {
    const { productId, quantity } = req.body;

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

            if (itemToUpdate) {
                //update item logic
                itemToUpdate.quantity = quantity;
                itemToUpdate.total_price = (quantity * product.price);

                try {
                    await sequelize.sync();
                    await itemToUpdate.save();
                    const cart = await getCart(authData.loggingInUser.id);
                    res.send(cart);
                } catch (e) {
                    console.error(e)
                    res.send(e)
                }
            } else {
                //add item logic
                try {
                    await sequelize.sync();
                    await CartItem.create({
                        product_id: productId,
                        cart_id: currentCart.id,
                        quantity,
                        total_price: product.price * quantity
                    });
                    const cart = await getCart(authData.loggingInUser.id);
                    res.send(cart);
                } catch (e) {
                    console.error(e)
                    res.send(e)
                }
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
                const cart = await getCart(authData.loggingInUser.id);
                res.send(cart);
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
                const cart = await getCart(authData.loggingInUser.id);
                res.send(cart);
            } catch (e) {
                console.error(e)
                res.send(e)
            }
        }
    });
})

module.exports = router;
