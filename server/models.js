const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('shufersal', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

//clients

//categories

//products

//shopping_carts

//cart_items

//orders

module.exports = {
    sequelize,
    Op
}
