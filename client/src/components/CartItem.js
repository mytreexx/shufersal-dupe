import styled from 'styled-components';
import QuantityControllers from '../components/ui/QuantityControllers';

import { BsXCircle } from 'react-icons/bs'
import { useState } from 'react';


const CartItem = ({ id, productName, image, brand, totalPrice, quantity, removeItemFromCart, addOrUpdateItem }) => {
    const [showControllers, setShowControllers] = useState(false)

    return (
        <Container
        onMouseEnter={() => setShowControllers(true)}
        onMouseLeave={() => setShowControllers(false)}
        >
            <div>
                {showControllers && <div onClick={() => { removeItemFromCart(id) }}><BsXCircle className="delete-btn" /></div>}

                <img src={image} />
            </div>

            <ItemDescription>
                <div>{productName}</div>

                {showControllers ?
                    <QuantityControllers
                        small
                        addOrUpdateItem={addOrUpdateItem}
                        id={id}
                        itemQuantity={quantity}
                    />
                    :
                    <div>{quantity} יח'</div>}

            </ItemDescription>
            <Price>₪{totalPrice}</Price>
        </Container>
    )
}

export default CartItem;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #E0E2E9 solid;
    padding: 5px;

    img {
        width: 70px;
        height: 70px;
        border-left: 1px solid #E0E2E9;
        margin-left: 5px;
    }

    .delete-btn {
        position: absolute;
    }

    svg {
        background-color: white;
        border-radius: 100%;
        width: 20px;
        height: 20px;
        transition: .3s;
    }

    div {
        display: flex;
    }
`;

const ItemDescription = styled.div`
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    /* border: 1px red solid; */
    width: 100%;
    height:75px;
    font-size: 14px;
    padding: 0;

`;

const Price = styled.div`
    align-self: flex-end;
    font-weight: bold;
`;
