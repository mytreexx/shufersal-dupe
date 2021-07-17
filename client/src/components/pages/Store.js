import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SecondaryNavbar from '../ui/SecondaryNavbar';
import Logo from '../../assets/Shufersal-logo-large.png';
import ProductItem from '../ProductItem';
import Carousel from '../ui/Carousel';
import SearchInput from '../ui/SearchInput';
import Cart from '../Cart';
import { getCategoriesFromServer, getAllProducts, onGetCategoryItems, getCartItems, addOrUpdateItemToCart, onRemoveItemFromCart, onEmptyCart } from '../../utils';

const Store = ({ currentUser }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState();
    const [cartItems, setCartItems] = useState();

    useEffect(() => {
        getCategoriesFromServer(currentUser)
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
    }, []);

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

    const getCategoryItems = (catagoryId) => {
        onGetCategoryItems(currentUser, catagoryId)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }

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
                <NavContainer>
                    <img src={Logo} />
                    <SecondaryNavbar />
                </NavContainer>
                <CategoriesNav>
                    {categories && categories.map(category =>
                        <div
                            key={category.id}
                            onClick={() => {
                                getCategoryItems(category.id)
                            }}
                        >
                            {category.category}
                        </div>
                    )}
                </CategoriesNav>

                <SearchInput setProducts={setProducts} currentUser={currentUser} />

                <Carousel />
                <ItemsContainer>
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
                </ItemsContainer>
            </div>
            <Cart
                currentUser={currentUser}
                cartItems={cartItems}
                removeItemFromCart={removeItemFromCart}
                emptyCart={emptyCart}
                addOrUpdateItem={addOrUpdateItem}
            />
        </Container>
    )
}

export default Store;

const NavContainer = styled.div`
    display: flex;
    height: 110px;
    align-items: center;
    border-bottom: 1px #f0f3f9 solid;
    padding-right: 40px;
`;

const CategoriesNav = styled.div`
    display: flex; 
    padding: 20px;
    padding-right: 50px;

    div {
        font-size: 16px;
        margin: 10px 0 10px 10px;
        padding: 5px 0 5px 10px;
        border-left: 2px solid #e0e2e9;
        cursor: pointer;

        :hover {
            color: #048BF3;
        }
    }

    div:last-child {
        border-left: none;
    }
`;

const ItemsContainer = styled.div`
    display: flex;
`;

const Container = styled.div`
display: flex;
`;