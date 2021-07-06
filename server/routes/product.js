const express = require('express');
const router = express.Router();
const { Op, sequelize, Product } = require('../models');


//get all products by category
router.get('/', async (req, res) => {
    const { categoryId } = req.body;

    const products = await Product.findAll({ where: { category_id: categoryId } });
    res.send(products)
})

//search for product
router.get('/search', async (req, res) => {
    const { searchTerm } = req.body;
    const products = await Product.findAll({ where: { product_name: { [Op.like]: `%${searchTerm}%` } } })

    res.send(products)
})

//admin: add new products
router.post('/', async (req, res) => {
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
router.patch('/', async (req, res) => {
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

module.exports = router;
