import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getCartItems } from '../utils';
import CartItem from './CartItem';

const Cart = ({ currentUser }) => {
    const [cartItems, setCartItems] = useState();

    useEffect(() => {
        getCartItems(currentUser)
            .then(response => response.json())
            .then(data => {
                setCartItems(data)
            })
    }, []);
    return (
        <Container>
            {cartItems && cartItems.map(item =>
                <CartItem
                    key={item.id}
                    id={item.id}
                    productName={item.product.product_name}
                    image={item.product.image}
                    brand={item.product.brand}
                    totalPrice={item.total_price}
                    quantity={item.quantity}
                />
            )}
        </Container>
    )
}

export default Cart;

const Container = styled.div`
    width: 400px;
    box-shadow: 0 3px 9px 0 rgb(0 0 0 / 35%);
`;