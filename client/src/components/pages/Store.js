import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../ui/Navbar';
import ProductItem from '../ProductItem';
import Carousel from '../ui/Carousel';
import SearchInput from '../ui/SearchInput';
import Cart from '../Cart';
import CategoriesNav from '../ui/CategoriesNav';
import { getAllProducts, getCartItems, addOrUpdateItemToCart, onRemoveItemFromCart, onEmptyCart } from '../../utils';

const Store = ({ currentUser, logout }) => {
    const [products, setProducts] = useState();
    const [cartItems, setCartItems] = useState();

    useEffect(() => {
        getAllProducts(currentUser)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }, []);

    useEffect(() => {
        getCartItems(currentUser)
            .then(response => response.json())
            .then(data => {
                setCartItems(data)
            })
    }, []);

    const addOrUpdateItem = (id, quantity) => {
        addOrUpdateItemToCart(currentUser, id, quantity)
            .then(response => response.json())
            .then(data => {
                setCartItems(data)
            })
    }

    const removeItemFromCart = (id) => {
        onRemoveItemFromCart(currentUser, id)
            .then(response => response.json())
            .then(data => {
                setCartItems(data)
            })
    }

    const emptyCart = () => {
        onEmptyCart(currentUser)
            .then(response => response.json())
            .then(data => {
                setCartItems(data)
            })
    }

    const getQuantity = (id) => {
        const cartItem = cartItems.find(cartItem => cartItem.product_id === id)

        if (cartItem) {
            return cartItem.quantity
        } else {
            return 1
        }
    }

    return (
        <Container>
            <div>
                <Navbar />
                <CategoriesNav currentUser={currentUser} setProducts={setProducts} />
                <SearchInput setProducts={setProducts} currentUser={currentUser} />
                <Carousel store />
                <Container>
                    {(products && cartItems) && products.map(product =>
                        <ProductItem
                            itemQuantity={getQuantity(product.id)}
                            key={product.id}
                            id={product.id}
                            name={product.product_name}
                            catagoryId={product.category_id}
                            price={product.price}
                            image={product.image}
                            brand={product.brand}
                            addOrUpdateItem={addOrUpdateItem}
                        />
                    )}
                </Container>
            </div>
            <Cart
                currentUser={currentUser}
                cartItems={cartItems}
                removeItemFromCart={removeItemFromCart}
                emptyCart={emptyCart}
                addOrUpdateItem={addOrUpdateItem}
                logout={logout}
            />
        </Container>
    )
}

export default Store;

const Container = styled.div`
    display: flex;
`;