import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsPerson, BsTrash } from 'react-icons/bs';

import CartItem from './CartItem';
import Header from './ui/Header';

const Cart = ({ cartItems, removeItemFromCart, emptyCart, addOrUpdateItem, logout, userDetails, readOnly }) => {
    const totalPrice = (cartItems || []).reduce((totalPrice, cartItem) => totalPrice + cartItem.total_price, 0); 

    return (
        <Container>
            <div>
                <CartHeader>
                    <div>
                        <BsPerson />
                        <strong>שלום {userDetails.first_name}</strong>
                    </div>
                    {!readOnly && <span onClick={logout}>התנתקות</span>}
                </CartHeader>

                {!readOnly && <div className='trash' onClick={emptyCart}><BsTrash />מחיקת סל</div>}
                {cartItems && cartItems.map(item =>
                    <CartItem
                        key={item.id}
                        id={item.product.id}
                        productName={item.product.product_name}
                        image={item.product.image}
                        brand={item.product.brand}
                        totalPrice={item.total_price}
                        quantity={item.quantity}
                        removeItemFromCart={removeItemFromCart}
                        addOrUpdateItem={addOrUpdateItem}
                    />
                )}
            </div>

            <CartFooter>
                <div>{totalPrice.toFixed(2)}<small>₪</small></div>
                {!readOnly && <Link to="/order">לתשלום</Link>}
            </CartFooter>

        </Container>
    )
}

export default Cart;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    box-shadow: 0 3px 9px 0 rgb(0 0 0 / 35%);
    height: 100vh;

    .trash {
        margin: 5px;
        padding-bottom: 5px;
        cursor: pointer;
        width: fit-content;
    }
`;

const CartHeader = styled(Header)`
    justify-content: space-between;
    align-items: flex-start;
    height: 110px;
    padding: 10px;
    font-size: 16px;

    svg {
        width: 25px;
        height: 25px;
        margin-left: 5px;
    }

    div {
        display: flex;
        align-content: center;
    }

    span {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const CartFooter = styled.div`
    width: 100%;    
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-self: flex-flex-end;


    a, div {
        width: 100%;
        color: white;
        font-size: 20px;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
    a {
        background-color:  #D51C4A;
    }

    div {
        background-color: #6D7A99;
    }

    small {
        font-size: 12px;
    }
`;
