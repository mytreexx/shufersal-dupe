import { useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';

const QuantityControllers = ({ addOrUpdateItem, id, itemQuantity }) => {

    const [quantity, setQuantity] = useState(itemQuantity);

    const decreaseQuantity = () => {
        setQuantity(quantity => quantity > 1 ? quantity - 1 : quantity)
    }
    return (
        <Container>
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
            <Button mini onClick={() => { addOrUpdateItem(id, quantity) }}>הוסף</Button>
        </Container>
    )
}

export default QuantityControllers;

const Container = styled.div`
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