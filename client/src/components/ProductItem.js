import { useState } from 'react';
import styled from 'styled-components';
import Button from './ui/Button';

const ProductItem = ({ categoryId, id, image, name, brand, price, addItem , itemQuantity}) => {
    const [quantity, setQuantity] = useState(itemQuantity);

    const decreaseQuantity = () => {
        setQuantity(quantity => quantity > 1 ? quantity - 1 : quantity)
    }

    return (
        <Container>
            <img src={image} />
            <div>₪{price}</div>
            <div>{name}</div>
            <div>{brand}</div>

            <Controllers>
                <div
                     className="unit-button"
                    onClick={() => { setQuantity(quantity + 1) }}
                >
                    +
                </div>

                <input
                    type='number'
                    min="1"
                    value={quantity}
                    onChange={(e) => { setQuantity(e.target.value) }}
                />
                <div>יח'</div>

                <div
                    className="unit-button"
                    onClick={decreaseQuantity}
                >
                    -
                </div>
                <Button mini onClick={() => { addItem(id, quantity) }}>הוסף</Button>
            </Controllers>
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

const Controllers = styled.div`
    display: flex;
    align-content: center;
    align-items: center;

    > * {
        margin-right: 5px;
        }

    input {
        width: 50px;
        border: 1px solid #e0e2e9;
        border-radius: 2px;
        height: 30px;
    }

    .unit-button {
        display: flex;
        justify-content: center;
        align-content: center;
        color: #D51C4A;
        font-weight: bold;
        font-size: 20px;
        border: 2px solid #e0e2e9;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        align-items: center;

        :hover {
        border: 2px solid #D51C4A;
        }

        
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
`;