import { useState } from 'react';
import styled from 'styled-components';
import QuantityControllers from './ui/QuantityControllers';

const ProductItem = ({ categoryId, id, image, name, brand, price, addOrUpdateItem, itemQuantity }) => {
    const [showControllers, setShowControllers] = useState(false)
    return (
        <Container
            onMouseEnter={() => setShowControllers(true)}
            onMouseLeave={() => setShowControllers(false)}
        >
            <img src={image} />
            <div>
                <strong>₪{price}</strong>
                <div><b>{name}</b> | {brand}</div>
            </div>


            <QuantityControllers
                id={id}
                itemQuantity={itemQuantity}
                addOrUpdateItem={addOrUpdateItem}
                style={showControllers ? { opacity: '1' } : { opacity: '0' }}
            />
        </Container>
    )
}

export default ProductItem;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
    height: 300px;
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

    strong {
        font-size: 20px;
        font-weight: normal;
    }
`;
