import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../ui/Navbar';
import ProductItem from '../ProductItem';
import Carousel from '../ui/Carousel';
import SearchInput from '../ui/SearchInput';
import Cart from '../Cart';
import CategoriesNav from '../ui/CategoriesNav';
import { getAllProducts, getCartItems, addOrUpdateItemToCart, onRemoveItemFromCart, onEmptyCart } from '../../utils';

const Store = ({ currentUser, userDetails, logout }) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

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
            <ContentContianer>
                <Navbar />
                <CategoriesNav currentUser={currentUser} setProducts={setProducts} />
                <SearchInput setProducts={setProducts} currentUser={currentUser} />
                <Carousel store />
                <ProductsList>
                    {products.map(product =>
                        <ProductItem
                            itemQuantity={getQuantity(product.id)}
                            key={product.id}
                            id={product.id}
                            name={product.product_name}
                            categoryId={product.category_id}
                            price={product.price}
                            image={product.image}
                            brand={product.brand}
                            addOrUpdateItem={addOrUpdateItem}
                            currentUser={currentUser}
                        />
                    )}
                </ProductsList>
            </ContentContianer>
            <Cart
                currentUser={currentUser}
                cartItems={cartItems}
                removeItemFromCart={removeItemFromCart}
                emptyCart={emptyCart}
                addOrUpdateItem={addOrUpdateItem}
                logout={logout}
                userDetails={userDetails}
            />
        </Container>
    )
}

export default Store;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const ProductsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    align-self: center;
`;


const ContentContianer = styled.div`
    max-width:1500px;
    flex-shrink: 10;
`;