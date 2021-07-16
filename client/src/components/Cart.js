import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCartItems } from '../utils';

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
            { cartItems && cartItems.map(item => <div>{item.product.product_name}</div>)}
        </Container>
    )
}

export default Cart;

const Container = styled.div`
    width: 400px;
    box-shadow: 0 3px 9px 0 rgb(0 0 0 / 35%);
`;