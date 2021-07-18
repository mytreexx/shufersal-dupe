import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsPerson, BsTrash } from 'react-icons/bs';

import CartItem from './CartItem';

const Cart = ({ cartItems, removeItemFromCart, emptyCart, addOrUpdateItem, logout }) => {
    const [totalCartPrice, setTotalCartPrice] = useState(0)

    useEffect(() => {
        let totalPrice = 0;

        cartItems && cartItems.forEach(item => {
            totalPrice = totalPrice + item.total_price
        });
        if (cartItems) {
            setTotalCartPrice(totalPrice)
        } else {
            setTotalCartPrice(0)
        }
    }, cartItems);

    return (
        <Container>
            <div>
                <Header>
                    <div>
                        <BsPerson />
                        <strong>שלום יוזר</strong>
                    </div>
                    <span onClick={logout}>התנתקות</span>
                </Header>


                <div className='trash' onClick={emptyCart}><BsTrash />מחיקת סל</div>
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
                <div>{totalCartPrice.toFixed(2)}<small>₪</small></div>
                <Link to="/order">לתשלום</Link>
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

    .trash {
        margin: 5px;
    }
`;

const Header = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background-color: #D51C4A;
    align-content: center;
    height: 110px;
    color: white;
    padding: 10px;

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
        width: 50%;
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
