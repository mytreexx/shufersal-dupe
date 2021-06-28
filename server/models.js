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

const Client = sequelize.define('client', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING
    },
    street: {
        type: DataTypes.STRING
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
});

const Category = sequelize.define('categories', {
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const Product = sequelize.define('products', {
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const ShoppingCart = sequelize.define('shopping_carts', {
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: false
});

const CartItem = sequelize.define('cart_items', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

const Order = sequelize.define('orders', {
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shipping_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    order_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    credit_card_last_digits: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Product.hasOne(Category, { foreignKey: 'id', sourceKey: 'category_id' });
ShoppingCart.hasOne(Client, { foreignKey: 'id', sourceKey: 'client_id' });

CartItem.hasOne(Product, { foreignKey: 'id', sourceKey: 'product_id' });
CartItem.hasOne(ShoppingCart, { foreignKey: 'id', sourceKey: 'cart_id' });

Order.hasOne(Client, { foreignKey: 'id', sourceKey: 'client_id' });
Order.hasOne(ShoppingCart, { foreignKey: 'id', sourceKey: 'cart_id' });

module.exports = {
    sequelize,
    Op,
    Client,
    Category,
    Product,
    ShoppingCart,
    CartItem,
    Order
};
