const express = require('express');
const router = express.Router();
const { Op, sequelize, Product, Category, Customer } = require('../models');
const jwt = require('jsonwebtoken');
const verifyTokenOrError = require('../utils/middlewares/JWT/verifyTokenOrError');
const { cloudinary } = require('../utils/cloudinary');


//get all categories
router.get('/categories', verifyTokenOrError, (req, res) => {

    jwt.verify(req.token, 'supersecretkey', async (err) => {
        if (err) {
            res.sendStatus(404);
        } else {
            const categories = await Category.findAll({});
            res.send(categories)
        }
    });
})

//get all products
router.get('/all', verifyTokenOrError, (req, res) => {

    jwt.verify(req.token, 'supersecretkey', async (err) => {
        if (err) {
            res.sendStatus(404);
        } else {
            const products = await Product.findAll({include: { model: Category } });
            res.send(products)
        }
    });
})

//get all products by category
router.post('/', verifyTokenOrError, (req, res) => {

    jwt.verify(req.token, 'supersecretkey', async (err, auth) => {
        if (err) {
            res.sendStatus(404);
        } else {
            const { categoryId } = req.body;

            const products = await Product.findAll({ where: { category_id: categoryId } });
            res.send(products)
        }
    });
})

//search for product
router.post('/search', verifyTokenOrError, (req, res) => {
    const { searchTerm } = req.body;
    console.log(searchTerm)

    jwt.verify(req.token, 'supersecretkey', async (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const products = await Product.findAll({ where: { product_name: { [Op.like]: `%${searchTerm}%` } } })
            res.send(products)
        }
    });
})

//admin: add new products
router.post('/new-item', verifyTokenOrError, (req, res) => {
    const { productName, categoryId, price, image, brand } = req.body;

    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (authData.loggingInUser.is_admin) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(image);
                    await sequelize.sync();
                    await Product.create({
                        product_name: productName,
                        category_id: categoryId,
                        price,
                        image: uploadResponse.secure_url,
                        brand
                    });
                    res.send();
                } catch (e) {
                    console.error(e)
                    res.send(e)
                }
            } else {
                res.sendStatus(403);
            }
        }
    });
})

//admin: edit products
router.put('/', verifyTokenOrError, async (req, res) => {
    const { productId, productName, categoryId, price, image, brand } = req.body;

    jwt.verify(req.token, 'supersecretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (authData.loggingInUser.is_admin) {
                const product = await Product.findOne({ where: { id: productId } });
                productName && (product.product_name = productName);
                categoryId && (product.category_id = categoryId);
                price && (product.price = price);
                brand && (product.brand = brand);

                if (image) {
                    const uploadResponse = await cloudinary.uploader.upload(image);
                    product.image = uploadResponse.secure_url;
                }

                try {
                    await product.save();
                    res.send(product);
                } catch (e) {
                    console.error(e)
                    res.send(e)
                }
            } else {
                res.sendStatus(403);
            }
        }
    });
})

module.exports = router;
