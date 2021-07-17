import { useState } from 'react';
import styled from 'styled-components';
import Button from './ui/Button';
import QuantityControllers from './ui/QuantityControllers';

const ProductItem = ({ categoryId, id, image, name, brand, price, addItem, itemQuantity }) => {

    return (
        <Container>
            <img src={image} />
            <div>₪{price}</div>
            <div>{name}</div>
            <div>{brand}</div>
            <QuantityControllers id={id} itemQuantity={itemQuantity} addItem={addItem} />
        </Container>
    )
}

export default ProductItem;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 275px;
    height: 370px;
    border: 1px solid #e0e2e9;
    margin: 10px;
    transition: .5s;
    padding: 10px;

    :hover {
        border: 1px solid #D51C4A;
    }

    img {
        height: 155px;
        width: 155px;
        margin: 0 auto;
    }
`;
